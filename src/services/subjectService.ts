import globalAxios from "./axiosConfig";
import { AxiosError } from "axios";
import { ApiError, GetSubjectsRequest, GetSubjectsResponse } from "./axios-wrappers";


// Gets all the subjects with optional pagination settings
export const listSubjectsAsyncGet = async (
    req: GetSubjectsRequest
  ): Promise<GetSubjectsResponse | ApiError> => {
    try {
      return (await globalAxios.post<GetSubjectsResponse>(`/subjects`, req)).data;
    } catch (error) {
      const err = error as AxiosError;
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
    }
  };