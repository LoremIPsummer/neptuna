import axios, { AxiosError } from 'axios';
import { Cookies } from "react-cookie";
import { ApiError, BaseResponse } from './axios-wrappers';
import showToast, { ToastOptions } from './toastrConfig';
const cookieManager = new Cookies();
const globalAxios = axios.create();

globalAxios.defaults.baseURL = process.env.BACKEND_URL;
globalAxios.defaults.headers.common['Content-Type'] = 'application/json';

globalAxios.interceptors.request.use(
    async config => {
      config.headers = { 
        'Authorization': `Bearer ${cookieManager.get("token") !== undefined
        ? cookieManager.get("token")
        : ""}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      return config;
    },
  );


  globalAxios.interceptors.response.use((response) => {
    const baseResponse = response["data"] as BaseResponse;
    showToast(ToastOptions.SUCCESS, baseResponse.result);
    return response;
});

  export const errorHandler = (error: any) => {
    const err = error as AxiosError;
    let errorObject : ApiError = {
      error: err.response?.data["errors"] ?? "Nem sikerült a szerverhez kapcsolódás. Ellenőrizze az internetkapcsolatát!",
      moreInfoType : err.response?.data["moreInfoType"],
      moreInfo: err.response?.data["moreInfo"],
      moreInfoData: err.response?.data["moreInfoData"],
      statusCode: err.response?.status ?? 503,
    };

    showToast(ToastOptions.ERROR, errorObject.error);
    return errorObject;
  }





export default globalAxios;