export interface PunkApiParams {
  url?: string;
  id?: string | number;
  filters?: string;
}
export interface PunkApiErrorResponse {
  statusCode: number;
  error: string;
  message: string;
}
