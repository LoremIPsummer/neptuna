import axios from 'axios';
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
      Promise.reject(error)
  });



export default globalAxios;