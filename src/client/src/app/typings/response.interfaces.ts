export interface SuccessResponse {
  success: boolean;
}

export interface ExistsResponse {
  exists: boolean;
}

export interface StatusResponse<T> extends SuccessResponse {
  reason: T;
}
