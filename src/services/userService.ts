import { AxiosError } from "axios";
import {
  ApiError,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UserDataResponse,
} from "./axios-wrappers";
import globalAxios, {errorHandler} from "./axiosConfig";

// POST
// /users/register
// register the user with the given information (REQUIRED: email, password, firstname, lastname, recaptcha)

export const registerUserAsyncPost = async (
  req: RegisterRequest
): Promise<RegisterResponse | ApiError> => {
  try{ 
    return (await globalAxios.post<RegisterResponse>(`/users/register`, req))
    .data;
  }
  catch(err){
    return errorHandler(err);
  }
 
};

// POST
// /users/login
// return the jwt

export const loginUserAsyncPost = async (
  req: LoginRequest
): Promise<LoginResponse | ApiError> => {
  try{
    return (await globalAxios.post<LoginResponse>(`/users/login`, req)).data; 
}
catch(err){
  return errorHandler(err);
}
};

// GET
// /users
// return the current user based on the token

export const userDataAsyncGet = async (): Promise<
  UserDataResponse | ApiError
> => {
  try{
    return (await globalAxios.get<UserDataResponse>(`/users`)).data;
  }
  catch(err){
    return errorHandler(err);
  }
 
};

// POST
// /users/resendconfirm
// resends the user confirmation mail to the user (if he hasnt confirmed it yet) on the log in page

export const resendConfirmAsyncPost = async (
  neptunaCode: string
): Promise<boolean | ApiError> => {
  try{
    return await globalAxios
    .post<boolean>(
      `/users/resendconfirm`,
      JSON.parse(`{"neptunacode": "${neptunaCode}"}`)
    )
    .then((resp) => {
      return resp.status === 200;
    });
  }
  catch(err){
    return errorHandler(err);
  }
 
};

// GET
// /users/accountconfirm
// Verifies the given neptuna code and token against the backend.

export const verifyAccountAsyncGet = async (
  neptunaCode: string,
  token: string
): Promise<boolean | ApiError> => {
  try{
    return await globalAxios
    .get<boolean>(
      `/users/accountconfirm?neptunacode=${neptunaCode}&token=${token}`
    )
    .then((resp) => {
      return resp.status === 200;
    });
  }
  catch(err){
    return errorHandler(err);
  }

};
