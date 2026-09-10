export interface MethodResponseError {
  status?: number;
  message?: string;
}

export type MethodResponseMetadata = {
  duration: number;
  ratelimit?: {
    limit: number;
    remaining: number;
    reset: number;
  };
  retryAfter?: number;
};

export type MethodResponseSuccess<D> = {
  meta?: MethodResponseMetadata;
  data: D;
  error: null;
};

export type MethodResponseFailure = {
  meta?: MethodResponseMetadata;
  data: null;
  error: MethodResponseError;
};

export type MethodResponse<D> = { meta?: MethodResponseMetadata } & (
  | MethodResponseSuccess<D>
  | MethodResponseFailure
);
