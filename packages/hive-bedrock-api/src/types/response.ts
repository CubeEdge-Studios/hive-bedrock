export type APIResponse<T> = APIResponseSuccess<T> | APIResponseFailure;

export type APIResponseSuccess<T> = {
  data: T;
  error: null;
  metadata: ResponseMetadata;
};
export type APIResponseFailure = {
  data: null;
  error: HiveAPIError;
  metadata: ResponseMetadata;
};

export type HiveAPIError = {
  code: string;
  message: string;
  status: number;
  details?: unknown;
};

export type ResponseMetadata = {
  status: number;
  duration?: number;
  rateLimit?: {
    limit?: number;
    remaining?: number;
    resetAt?: number;
  };
};

export type PaginatedResponse<T> = APIResponse<T[]> & {
  pagination: Pagination;
};

export type Pagination = {
  limit?: number;
  offset?: number;
  cursor?: string;
  nextCursor?: string;
  total?: number;
};

export type PaginationOptions = {
  limit?: number;
  offset?: number;
  cursor?: string;
};
