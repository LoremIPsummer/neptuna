import {
  ApplySubjectRequest,
  BaseRequest,
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
  listSubjectsAsyncGet,
  terminateSubjectAsyncPost,
} from "../../services/subjectService";
import {
  isResponseSucceed,
  isSubjectGetSuccess,
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
  return await listSubjectsAsyncGet(req).then((data) => {
    thunkApi.dispatch(setLoadState(false, Meta.SubjectsFetch));
    if (!isSubjectGetSuccess(data)) {
      thunkApi.dispatch(
        setError({ error: data.error, statusCode: data.statusCode })
      );
      return thunkApi.rejectWithValue(data);
    } else {
      thunkApi.dispatch(setError({ error: "", statusCode: 200 }));
      return data;
    }
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
  return await applySubjectAsyncPost(req).then((data) => {
    thunkApi.dispatch(setLoadState(false, Meta.SubjectApply));
    if (isResponseSucceed(data)) {
      thunkApi.dispatch(setError({ error: "", statusCode: 200 }));
      return data;
    } else {
      thunkApi.dispatch(
        setError({ error: data.error, statusCode: data.statusCode })
      );
      return thunkApi.rejectWithValue(data);
    }
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
  return await terminateSubjectAsyncPost(req).then((data) => {
    thunkApi.dispatch(setLoadState(false, Meta.TerminateSubject));
    if (isResponseSucceed(data)) {
      thunkApi.dispatch(setError({ error: "", statusCode: 200 }));
      return data;
    } else {
      thunkApi.dispatch(
        setError({ error: data.error, statusCode: data.statusCode })
      );
      return thunkApi.rejectWithValue(data);
    }
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
