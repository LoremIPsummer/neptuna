import globalAxios, { errorHandler } from "./axiosConfig";
import {
  ApiError,
  ApplySubjectRequest,
  BaseRequest,
  BaseResponse,
  GetSubjectsResponse,
  TerminateSubjectRequest,
} from "./axios-wrappers";

// Gets all the subjects
export const listSubjectsAsyncGet = async (
  req?: BaseRequest
): Promise<GetSubjectsResponse | ApiError> => {
  try {
    const resp = await globalAxios.get<GetSubjectsResponse>(`/subjects`);
    const { subjects, result } = resp.data;
    return { subjects, result };
  } catch (err) {
    return errorHandler(err);
  }
};

//applying for a subject
export const applySubjectAsyncPost = async (
  req: ApplySubjectRequest
): Promise<BaseResponse | ApiError> => {
  try {
    const resp = await globalAxios.post<BaseResponse>(
      `/subjects/apply`,
      JSON.stringify(req)
    );
    const { result } = resp.data;
    return { result };
  } catch (err) {
    return errorHandler(err);
  }
};

export const terminateSubjectAsyncPost = async (
  req: TerminateSubjectRequest
): Promise<BaseResponse | ApiError> => {
  try {
    const resp = await globalAxios.post<BaseResponse>(
      `/subjects/terminate`,
      JSON.stringify(req)
    );
    const { result } = resp.data;
    return { result };
  } catch (err) {
    return errorHandler(err);
  }
};
