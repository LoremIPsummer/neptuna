import {
  ApiError,
  BaseResponse,
  GetSubjectsResponse,
  LoginResponse,
  RegisterResponse,
  UserDataResponse,
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

export function isConfirmMailError(
  response: boolean | ApiError
): response is ApiError {
  return (response as ApiError).statusCode !== undefined;
}

export function isUserVerifiedError(
  response: boolean | ApiError
): response is ApiError {
  return (response as ApiError).statusCode !== undefined;
}

export function isSubjectGetSuccess(
  response: GetSubjectsResponse | ApiError
): response is GetSubjectsResponse {
  return (response as GetSubjectsResponse).subjects !== undefined;
}
