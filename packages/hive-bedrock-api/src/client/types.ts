export type APIClientOptions = {
  baseUrl?: string;
  timeout?: number;
  headers?: Record<string, string>;
};

export type APIRequestOptions = {
  requestInit?: RequestInit;
};
