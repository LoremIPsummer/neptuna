import { AxiosError } from "axios";
import {
  ApiError,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UserDataResponse,
} from "./axios-wrappers";
import globalAxios from "./axiosConfig";

// POST
// /users/register
// register the user with the given information (REQUIRED: email, password, firstname, lastname, recaptcha)

export const registerUserAsyncPost = async (
  req: RegisterRequest
): Promise<RegisterResponse | ApiError> => {
  return (await globalAxios.post<RegisterResponse>(`/users/register`, req))
    .data;
};

// POST
// /users/login
// return the jwt

export const loginUserAsyncPost = async (
  req: LoginRequest
): Promise<LoginResponse | ApiError> => {
  return (await globalAxios.post<LoginResponse>(`/users/login`, req)).data;
};

// GET
// /users
// return the current user based on the token

export const userDataAsyncGet = async (): Promise<
  UserDataResponse | ApiError
> => {
  return (await globalAxios.get<UserDataResponse>(`/users`)).data;
};

// POST
// /users/resendconfirm
// resends the user confirmation mail to the user (if he hasnt confirmed it yet) on the log in page

export const resendConfirmAsyncPost = async (
  neptunaCode: string
): Promise<boolean | ApiError> => {
  return await globalAxios
    .post<boolean>(
      `/users/resendconfirm`,
      JSON.parse(`{"neptunacode": "${neptunaCode}"}`)
    )
    .then((resp) => {
      return resp.status === 200;
    });
};

// GET
// /users/accountconfirm
// Verifies the given neptuna code and token against the backend.

export const verifyAccountAsyncGet = async (
  neptunaCode: string,
  token: string
): Promise<boolean | ApiError> => {
  return await globalAxios
    .get<boolean>(
      `/users/accountconfirm?neptunacode=${neptunaCode}&token=${token}`
    )
    .then((resp) => {
      return resp.status === 200;
    });
};
