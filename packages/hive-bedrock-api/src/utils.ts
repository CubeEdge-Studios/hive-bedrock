export interface MethodResponseError {
    status?: number;
    message?: string;
}

export type MethodResponse<D extends any> = {
    meta?: {
        /** sss */
        duration: number;
        ratelimit?: {
            limit: number;
            remaining: number;
            reset: number;
        };
        retryAfter?: number;
    };
} & ({ data: D; error: null } | { data: null; error: MethodResponseError });
