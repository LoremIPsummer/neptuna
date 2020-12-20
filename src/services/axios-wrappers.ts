import { SubjectModel } from "../models/subject";
import { Role, UserModel } from "../models/user";

export interface BaseResponse {
  result: string;
  statusCode: number;
  displayable: boolean;
}
export interface BaseRequest {}

export interface LoginResponse extends BaseResponse {
  token: string;
}

export interface RegisterResponse extends BaseResponse {
  user: UserModel;
}

export interface LoginRequest {
  neptunaCode: string;
  recaptcha: string;
  password: string;
}

export interface ResendMailRequest {
  neptunaCode: string;
}
export interface ResendMailResponse extends BaseResponse {}

export interface VerifyRequest {
  neptunaCode: string;
  token: string;
}
export interface VerifyResponse extends BaseResponse {}
export interface RegisterRequest {
  email: string;
  recaptcha: string;
  password: string;
  firstName: string;
  lastName: string;
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

export interface RemoveSubjectRequest {
  subjectCode: string;
}
export interface RemoveSubjectResponse extends BaseResponse {
  deletedSubject: SubjectModel;
}

export interface CreateSubjectResponse extends BaseResponse {
  createdSubject: SubjectModel;
}
export interface CreateSubjectRequest {
  credit: number;
  subjectName: string;
  neptunaCode: string;
}

export interface CreateUserResponse extends BaseResponse {
  createdUser: SubjectModel;
}

export interface CreateUserRequest {
  role: Role;
  lastName: string;
  firstName: string;
  email: string;
}

export interface RemoveUserRequest {
  neptunaCode: string;
}
export interface RemoveUserResponse extends BaseResponse {
  deletedUser: UserModel;
}

export interface GetUsersRequest {}
export interface GetUsersResponse extends BaseResponse {
  users: UserModel[];
}
