export interface LoginResponse {
  token: string;
  errorMessage: string | undefined;
}
export interface RegisterResponse {
  errorMessage: string | undefined;
}

export interface LoginRequest {
  neptunaCode: string;
  recaptcha: string;
  password: string;
}
export interface RegisterRequest {
  email: string;
  recaptcha: string;
  password: string;
}

export interface ApiError {
  error: string | undefined;
  statusCode: number | undefined;
}
