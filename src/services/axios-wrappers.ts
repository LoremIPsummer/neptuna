import { UserModel } from "../models/user";

export interface LoginResponse {
  token: string;
}
export interface RegisterResponse {}

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
  moreInfo?: string;
  moreInfoType?: string;
  moreInfoData?: string;
}

export interface UserDataRequest {}

export interface UserDataResponse {
  result: UserModel;
}
