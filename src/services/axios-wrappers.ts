import { SubjectModel } from "../models/subject";
import { UserModel } from "../models/user";

export interface BaseResponse {
  result: string;
}
export interface BaseRequest {}

export interface LoginResponse extends BaseResponse {
  token: string;
}

export interface RegisterResponse extends BaseResponse {}

export interface LoginRequest {
  neptunaCode: string;
  recaptcha: string;
  password: string;
}

export interface AccountConfirmRequest {
  neptunaCode: string;
  token: string;
}
export interface RegisterRequest {
  email: string;
  recaptcha: string;
  password: string;
  name: string;
}

export interface ApiError {
  error: string;
  statusCode: number;
  moreInfo?: string;
  moreInfoType?: string;
  moreInfoData?: string;
}

export interface UserDataRequest {}

export interface UserDataResponse extends BaseResponse {
  user: UserModel;
}

export interface GetSubjectsRequest {
  from?: number;
  take?: number;
}

export interface GetSubjectsResponse extends BaseResponse {
  subjects: SubjectModel[];
}

export interface ApplySubjectRequest {
  subjectId: string;
}

export interface TerminateSubjectRequest extends ApplySubjectRequest {}
