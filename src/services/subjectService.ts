import globalAxios from "./axiosConfig";
import { AxiosError } from "axios";
import {
  ApiError,
  GetSubjectsRequest,
  GetSubjectsResponse,
} from "./axios-wrappers";

// Gets all the subjects with optional pagination settings
export const listSubjectsAsyncGet = async (
  req?: GetSubjectsRequest
): Promise<GetSubjectsResponse | ApiError> => {
  return (await globalAxios.get<GetSubjectsResponse>(`/subjects`)).data;
};
