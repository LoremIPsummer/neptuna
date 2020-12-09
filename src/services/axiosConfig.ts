import axios, { AxiosError } from 'axios';
import { Cookies } from "react-cookie";
import { ApiError } from './axios-wrappers';
import showToast, { ToastOptions } from './toastrConfig';
const cookieManager = new Cookies();
const globalAxios = axios.create({baseURL: process.env.REACT_APP_BACKEND_URL});

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