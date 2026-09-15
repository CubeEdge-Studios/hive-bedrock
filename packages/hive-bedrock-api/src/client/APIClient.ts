import { API_BASE } from "hive-bedrock-data";
import type { APIResponse, HiveAPIError, ResponseMetadata } from "../types/response.js";
import type { APIClientOptions } from "./types.js";

export class APIClient {
  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly headers: Record<string, string>;

  constructor(options: APIClientOptions) {
    this.baseUrl = options.baseUrl ?? API_BASE;
    this.timeout = options.timeout ?? 10_000;
    this.headers = options.headers ?? {};
  }

  async request<T>(endpoint: string, requestInit?: RequestInit): Promise<APIResponse<T>> {
    const url = new URL(endpoint, this.baseUrl);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeout);

    const start = performance.now();

    try {
      const response = await fetch(url, {
        ...requestInit,
        headers: {
          ...this.headers,
          ...requestInit?.headers,
        },
        signal: controller.signal,
      });
      const metadata: ResponseMetadata = {
        status: response.status,
        duration: Math.ceil(performance.now() - start),
        rateLimit: {
          limit: this.getNumberHeader(response, "X-Ratelimit-Limit"),
          remaining: this.getNumberHeader(response, "X-Ratelimit-Remaining"),
          resetAt: this.getNumberHeader(response, "X-Ratelimit-Reset"),
        },
      };

      if (!response.ok) {
        return {
          data: null,
          error: await this.getError(response),
          metadata,
        };
      }

      const data = (await response.json()) as T;

      return {
        data,
        error: null,
        metadata,
      };
    } catch (error) {
      return {
        data: null,
        error: this.getRequestError(error),
        metadata: {
          status: 0,
        },
      };
    } finally {
      clearTimeout(timeout);
    }
  }

  private getNumberHeader(response: Response, name: string): number | undefined {
    const value = response.headers.get(name);
    if (value === null) return undefined;

    const number = Number(value);
    return Number.isNaN(number) ? undefined : number;
  }

  private async getError(response: Response): Promise<HiveAPIError> {
    let details: unknown;
    let code = response.status.toString();

    try {
      details = await response.json();
      if (typeof details === "object" && details !== null && "code" in details) {
        code = (details as { code: string }).code;
      }
    } catch {
      // Response didn't contain JSON.
    }

    return {
      code,
      message: response.statusText,
      status: response.status,
      details,
    };
  }

  private getRequestError(error: unknown): HiveAPIError {
    return {
      code: "REQUEST_FAILED",
      message: error instanceof Error ? error.message : "Unknown error",
      status: 0,
    };
  }
}
