import { ApiError, LoginResponse, UserDataResponse } from "./axios-wrappers";

export function isLoginSucceed(
  response: LoginResponse | ApiError
): response is LoginResponse {
  return (response as LoginResponse).token !== undefined;
}

export function isCurrentUserRetrieved(
  response: UserDataResponse | ApiError
): response is UserDataResponse {
  return (response as UserDataResponse).result?.neptunaCode !== undefined;
}

export function isConfirmMailError(
  response: boolean | ApiError
): response is ApiError {
  return (response as ApiError).statusCode !== undefined;
}
