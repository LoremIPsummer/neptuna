import { UserModel } from "../models/user";

export interface LoginResponse {
  token: string;
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
  error: string;
  statusCode: number;
}

export interface UserDataRequest {}

export interface UserDataResponse {
  result: UserModel;
}