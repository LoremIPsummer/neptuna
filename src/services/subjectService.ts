import globalAxios, { errorHandler } from "./axiosConfig";
import {
  ApiError,
  ApplySubjectRequest,
  BaseRequest,
  BaseResponse,
  CreateSubjectRequest,
  CreateSubjectResponse,
  GetSubjectsResponse,
  RemoveSubjectRequest,
  RemoveSubjectResponse,
  TerminateSubjectRequest,
} from "./axios-wrappers";

// Gets all the subjects
export const listSubjectsAsyncGet = async (
  req?: BaseRequest
): Promise<GetSubjectsResponse | ApiError> => {
  try {
    const resp = await globalAxios.get<GetSubjectsResponse>(`/subjects`);
    const { subjects, result } = resp.data;
    return { subjects, result, displayable: false, statusCode: resp.status };
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
    return { result, displayable: true, statusCode: resp.status };
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
    return { result, displayable: true, statusCode: resp.status };
  } catch (err) {
    return errorHandler(err);
  }
};

export const deleteSubjectAsync = async (
  req: RemoveSubjectRequest
): Promise<RemoveSubjectResponse | ApiError> => {
  try {
    const resp = await globalAxios.delete<RemoveSubjectResponse>(
      `/subjects?subjectCode=${req.subjectCode}`
    );
    const { result, deletedSubject } = resp.data;
    return {
      result,
      displayable: true,
      statusCode: resp.status,
      deletedSubject,
    };
  } catch (err) {
    return errorHandler(err);
  }
};

export const createSubjectAsyncPost = async (
  req: CreateSubjectRequest
): Promise<CreateSubjectResponse | ApiError> => {
  try {
    const resp = await globalAxios.post<CreateSubjectResponse>(
      `/subjects/`,
      req
    );
    const { result, createdSubject } = resp.data;
    return {
      result,
      displayable: true,
      statusCode: resp.status,
      createdSubject,
    };
  } catch (err) {
    return errorHandler(err);
  }
};
