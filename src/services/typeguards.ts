import {
  ApiError,
  BaseResponse,
  CreateSubjectResponse,
  CreateUserResponse,
  GetSubjectsResponse,
  GetUsersResponse,
  LoginResponse,
  RegisterResponse,
  RemoveSubjectResponse,
  RemoveUserResponse,
  ResendMailResponse,
  UserDataResponse,
  VerifyResponse,
} from "./axios-wrappers";

export function isResponseSucceed(
  response: BaseResponse | ApiError
): response is BaseResponse {
  return (response as BaseResponse).result !== undefined;
}

export function isLoginSucceed(
  response: LoginResponse | ApiError
): response is LoginResponse {
  return (response as LoginResponse).token !== undefined;
}

export function isRegisterSucceed(
  response: RegisterResponse | ApiError
): response is RegisterResponse {
  return (response as RegisterResponse).result !== undefined;
}

export function isCurrentUserRetrieved(
  response: UserDataResponse | ApiError
): response is UserDataResponse {
  return (response as UserDataResponse).user !== undefined;
}

export function isConfirmMailSucceed(
  response: ResendMailResponse | ApiError
): response is ResendMailResponse {
  return (response as ResendMailResponse).result !== undefined;
}

export function isUserVerifiedSucceed(
  response: VerifyResponse | ApiError
): response is ApiError {
  return (response as VerifyResponse).result !== undefined;
}

export function isSubjectGetSuccess(
  response: GetSubjectsResponse | ApiError
): response is GetSubjectsResponse {
  return (response as GetSubjectsResponse).subjects !== undefined;
}

export function isSubjectRemoved(
  response: RemoveSubjectResponse | ApiError
): response is RemoveSubjectResponse {
  return (response as RemoveSubjectResponse).deletedSubject !== undefined;
}
export function isSubjectCreated(
  response: CreateSubjectResponse | ApiError
): response is CreateSubjectResponse {
  return (response as CreateSubjectResponse).createdSubject !== undefined;
}

export function isUserRemoved(
  response: RemoveUserResponse | ApiError
): response is RemoveUserResponse {
  return (response as RemoveUserResponse).deletedUser !== undefined;
}
export function isUserCreated(
  response: CreateUserResponse | ApiError
): response is CreateUserResponse {
  return (response as CreateUserResponse).createdUser !== undefined;
}
export function areUsersRetrieved(
  response: GetUsersResponse | ApiError
): response is GetUsersResponse {
  return (response as GetUsersResponse).users !== undefined;
}
