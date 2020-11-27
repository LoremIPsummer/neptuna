import globalAxios, {errorHandler} from "./axiosConfig";
import {
  ApiError,
  GetSubjectsRequest,
  GetSubjectsResponse,
} from "./axios-wrappers";

// Gets all the subjects with optional pagination settings
export const listSubjectsAsyncGet = async (
  req?: GetSubjectsRequest
): Promise<GetSubjectsResponse | ApiError> => {
  try{
    return (await globalAxios.get<GetSubjectsResponse>(`/subjects`)).data;
  }
  catch(err){
    return errorHandler(err);
  }
  
};
