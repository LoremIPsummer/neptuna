import {
  ApplySubjectRequest,
  BaseRequest,
  CreateSubjectRequest,
  CreateSubjectResponse,
  RemoveSubjectRequest,
  RemoveSubjectResponse,
  TerminateSubjectRequest,
} from "./../../services/axios-wrappers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState, store } from "../store";
import { SubjectModel } from "../../models/subject";
import {
  ApiError,
  BaseResponse,
  GetSubjectsRequest,
  GetSubjectsResponse,
} from "../../services/axios-wrappers";
import {
  applySubjectAsyncPost,
  createSubjectAsyncPost,
  deleteSubjectAsync,
  listSubjectsAsyncGet,
  terminateSubjectAsyncPost,
} from "../../services/subjectService";
import {
  isResponseSucceed,
  isSubjectCreated,
  isSubjectGetSuccess,
  isSubjectRemoved,
} from "../../services/typeguards";
import { setError } from "./errorApi";
import { Meta, setLoadState } from "./loadApi";
import showToast, { ToastOptions } from "../../services/toastrConfig";

interface SubjectState {
  loadedSubjects: SubjectModel[];
}
const initialState: SubjectState = {
  loadedSubjects: [],
};

export const getSubjects = createAsyncThunk<
  GetSubjectsResponse,
  BaseRequest,
  {
    state: RootState;
    rejectValue: ApiError;
  }
>("subjects", async (req, thunkApi) => {
  thunkApi.dispatch(setLoadState(true, Meta.SubjectsFetch));
  return await listSubjectsAsyncGet(req).then((resp) => {
    thunkApi.dispatch(setLoadState(false, Meta.SubjectsFetch));
    thunkApi.dispatch(setError(resp));
    if (isSubjectGetSuccess(resp)) {
      return resp;
    }
    return thunkApi.rejectWithValue(resp);
  });
});

export const applySubject = createAsyncThunk<
  BaseResponse,
  ApplySubjectRequest,
  {
    state: RootState;
    rejectValue: ApiError;
  }
>("subjects/apply", async (req, thunkApi) => {
  thunkApi.dispatch(setLoadState(true, Meta.SubjectApply));
  return await applySubjectAsyncPost(req).then((resp) => {
    thunkApi.dispatch(setLoadState(false, Meta.SubjectApply));
    thunkApi.dispatch(setError(resp));
    if (isResponseSucceed(resp)) {
      return resp;
    }
    return thunkApi.rejectWithValue(resp);
  });
});

export const terminateSubject = createAsyncThunk<
  BaseResponse,
  TerminateSubjectRequest,
  {
    state: RootState;
    rejectValue: ApiError;
  }
>("subjects/terminate", async (req, thunkApi) => {
  thunkApi.dispatch(setLoadState(true, Meta.TerminateSubject));
  return await terminateSubjectAsyncPost(req).then((resp) => {
    thunkApi.dispatch(setLoadState(false, Meta.TerminateSubject));
    thunkApi.dispatch(setError(resp));
    if (isResponseSucceed(resp)) {
      return resp;
    }
    return thunkApi.rejectWithValue(resp);
  });
});

export const deleteSubject = createAsyncThunk<
  RemoveSubjectResponse,
  RemoveSubjectRequest,
  {
    state: RootState;
    rejectValue: ApiError;
  }
>("subjects/delete", async (req, thunkApi) => {
  thunkApi.dispatch(setLoadState(true, Meta.DeleteSubject));
  return await deleteSubjectAsync(req).then((resp) => {
    thunkApi.dispatch(setLoadState(false, Meta.DeleteSubject));
    thunkApi.dispatch(setError(resp));
    if (isSubjectRemoved(resp)) {
      return resp;
    }
    return thunkApi.rejectWithValue(resp);
  });
});

export const createSubject = createAsyncThunk<
  CreateSubjectResponse,
  CreateSubjectRequest,
  {
    state: RootState;
    rejectValue: ApiError;
  }
>("subjects/create", async (req, thunkApi) => {
  thunkApi.dispatch(setLoadState(true, Meta.CreateSubject));
  return await createSubjectAsyncPost(req).then((resp) => {
    thunkApi.dispatch(setLoadState(false, Meta.CreateSubject));
    thunkApi.dispatch(setError(resp));
    if (isSubjectCreated(resp)) {
      return resp;
    }
    return thunkApi.rejectWithValue(resp);
  });
});

export const subjectApiSlice = createSlice({
  name: "subjectApi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubjects.pending, (state, action) => {});
    builder.addCase(getSubjects.fulfilled, (state, action) => {
      state.loadedSubjects = action.payload.subjects;
      console.log(state.loadedSubjects);
    });
    builder.addCase(getSubjects.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(applySubject.fulfilled, (state, action) => {
      showToast(ToastOptions.SUCCESS, action.payload.result);
    });
    builder.addCase(terminateSubject.fulfilled, (state, action) => {
      showToast(ToastOptions.SUCCESS, action.payload.result);
    });
  },
});

export const subjects = (state: RootState) => {
  return state.subjects.loadedSubjects;
};

export default subjectApiSlice.reducer;
