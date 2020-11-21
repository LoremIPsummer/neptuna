import axios, { AxiosError } from 'axios';
import { Cookies } from "react-cookie";
const cookieManager = new Cookies();
const globalAxios = axios.create();

globalAxios.defaults.baseURL = process.env.REACT_APP_API_URL ?? ""
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
    error => {
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
  });



export default globalAxios;