import globalAxios, { errorHandler } from "./axiosConfig";
import {
  ApiError,
  GetSubjectsRequest,
  GetSubjectsResponse,
} from "./axios-wrappers";

// Gets all the subjects with optional pagination settings
export const listSubjectsAsyncGet = async (
  req?: GetSubjectsRequest
): Promise<GetSubjectsResponse | ApiError> => {
  try {
    const resp = await globalAxios.get<GetSubjectsResponse>(`/subjects`);
    const { subjects, result } = resp.data;
    return { subjects, result };
  } catch (err) {
    return errorHandler(err);
  }
};
