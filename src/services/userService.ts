import { UserModel } from "../models/user";
import {
  ApiError,
  CreateUserRequest,
  CreateUserResponse,
  GetUsersResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RemoveUserRequest,
  RemoveUserResponse,
  ResendMailRequest,
  ResendMailResponse,
  UserDataResponse,
  VerifyRequest,
  VerifyResponse,
} from "./axios-wrappers";
import globalAxios, { errorHandler } from "./axiosConfig";

// POST
// /users/register
// register the user with the given information (REQUIRED: email, password, firstname, lastname, recaptcha)

export const registerUserAsyncPost = async (
  req: RegisterRequest
): Promise<RegisterResponse | ApiError> => {
  try {
    const resp = await globalAxios.post<RegisterResponse>(
      `/users/register`,
      req
    );
    const { result, user } = resp.data;
    return { result, user, displayable: true, statusCode: resp.status };
  } catch (err) {
    return errorHandler(err);
  }
};

// POST
// /users/auth
// return the jwt

export const loginUserAsyncPost = async (
  req: LoginRequest
): Promise<ApiError | LoginResponse> => {
  try {
    const resp = await globalAxios.post<LoginResponse>(`/users/auth`, req);
    const { result, token } = resp.data;
    return { result, token, displayable: true, statusCode: resp.status };
  } catch (err) {
    return errorHandler(err);
  }
};

// GET
// /users/current
// return the current user based on the token

export const userDataAsyncGet = async (): Promise<
  UserDataResponse | ApiError
> => {
  try {
    const resp = await globalAxios.get<UserDataResponse>(`/users/current`);
    const { user, result } = resp.data;
    return { user, result, displayable: false, statusCode: resp.status };
  } catch (err) {
    return errorHandler(err);
  }
};

// POST
// /users/resendconfirm
// resends the user confirmation mail to the user (if he hasnt confirmed it yet) on the log in page

export const resendConfirmAsyncPost = async (
  req: ResendMailRequest
): Promise<ResendMailResponse | ApiError> => {
  try {
    const resp = await globalAxios.post<ResendMailResponse>(
      `/users/resendconfirm`,
      JSON.parse(`{"neptunacode": "${req.neptunaCode}"}`)
    );
    const { result } = resp.data;
    return { result, displayable: true, statusCode: resp.status };
  } catch (err) {
    return errorHandler(err);
  }
};

// GET
// /users/accountconfirm
// Verifies the given neptuna code and token against the backend.

export const verifyAccountAsyncGet = async (
  req: VerifyRequest
): Promise<VerifyResponse | ApiError> => {
  try {
    const resp = await globalAxios.get<VerifyResponse>(
      `/users/accountconfirm?neptunacode=${req.neptunaCode}&token=${req.token}`
    );
    const { result } = resp.data;
    return { result, displayable: true, statusCode: resp.status };
  } catch (err) {
    return errorHandler(err);
  }
};

export const createUserAsyncPost = async (
  req: CreateUserRequest
): Promise<CreateUserResponse | ApiError> => {
  try {
    const resp = await globalAxios.post<CreateUserResponse>(`/users/`, req);
    const { result, createdUser } = resp.data;
    return { result, displayable: true, statusCode: resp.status, createdUser };
  } catch (err) {
    return errorHandler(err);
  }
};

export const deleteAccountAsync = async (
  req: RemoveUserRequest
): Promise<RemoveUserResponse | ApiError> => {
  try {
    const resp = await globalAxios.delete<RemoveUserResponse>(
      `/users?neptunaCode=${req.neptunaCode}`
    );
    const { result, deletedUser } = resp.data;
    return { result, displayable: true, statusCode: resp.status, deletedUser };
  } catch (err) {
    return errorHandler(err);
  }
};

export const allUserAsyncGet = async (): Promise<
  GetUsersResponse | ApiError
> => {
  try {
    const resp = await globalAxios.get<GetUsersResponse>(`/users`);
    const { result, users } = resp.data;
    return { result, displayable: false, statusCode: resp.status, users };
  } catch (err) {
    return errorHandler(err);
  }
};
