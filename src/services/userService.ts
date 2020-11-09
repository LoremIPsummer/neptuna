import { AxiosError } from "axios";
import {
  ApiError,
  LoginRequest,
  LoginResponse,
  UserDataResponse,
} from "./axios-wrappers";
import globalAxios from "./axiosConfig";

// POST
// /users/login
// return the jwt

export const loginUserAsyncPost = async (
  req: LoginRequest
): Promise<LoginResponse | ApiError> => {
  try {
    return (await globalAxios.post<LoginResponse>(`/users/login`, req)).data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      return {
        error: err.response.data["errors"] ?? "Nem sikerült a szerverhez kapcsolódás. Ellenőrizze az internetkapcsolatát!",
        moreInfoType : err.response.data["moreInfoType"],
        moreInfo: err.response.data["moreInfo"],
        moreInfoData: err.response.data["moreInfoData"],
        statusCode: err.response.status,
      };
    } else {
      return {
        error:
          "Nem sikerült a szerverhez kapcsolódás. Ellenőrizze az internetkapcsolatát!",
        statusCode: 503,
      };
    }
  }
};

// GET
// /users
// return the current user based on the token

export const userDataAsyncGet = async (): Promise<
  UserDataResponse | ApiError
> => {

    const response = await globalAxios.get<UserDataResponse>(`/users`, ).then(resp => {
      return resp.data;
    })
    .catch(error => {
      const err = error as AxiosError;
      console.log(err);
      if (err.response) {
        return {
          error: err.response.data["errors"] ?? "Nem sikerült a szerverhez kapcsolódás. Ellenőrizze az internetkapcsolatát!",
          statusCode: err.response.status,
        };
      } else {
        return {
          error:
            "Nem sikerült a szerverhez kapcsolódás. Ellenőrizze az internetkapcsolatát!",
          statusCode: 503,
        };
      }
    })

    return response;
  
};

// POST
// /users/resendconfirm
// resends the user confirmation mail to the user (if he hasnt confirmed it yet)

export const resendConfirmAsyncPost = async (neptunaCode : string): Promise<
  boolean | ApiError
> => {
    const response = await globalAxios.post<boolean>(`/users/resendconfirm`).then(resp => {
      return resp.status === 200;
    })
    .catch(error => {
      const err = error as AxiosError;
      console.log(err);
      if (err.response) {
        return {
          error: err.response.data["errors"] ?? "Nem sikerült a szerverhez kapcsolódás. Ellenőrizze az internetkapcsolatát!",
          statusCode: err.response.status,
        };
      } else {
        return {
          error:
            "Nem sikerült a szerverhez kapcsolódás. Ellenőrizze az internetkapcsolatát!",
          statusCode: 503,
        };
      }
    })

    return response;

  
};