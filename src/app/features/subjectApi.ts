import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState, store } from "../store";
import { SubjectModel } from "../../models/subject";
import {
  ApiError,
  GetSubjectsRequest,
  GetSubjectsResponse,
} from "../../services/axios-wrappers";
import { setLoadState } from "./loadApi";
import { listSubjectsAsyncGet } from "../../services/subjectService";
import { isSubjectGetSuccess } from "../../services/typeguards";
import { setErrorState } from "./errorApi";

interface SubjectState {
  loadedSubjects: SubjectModel[];
}
const initialState: SubjectState = {
  loadedSubjects: [],
};

export const getSubjectsAsync = createAsyncThunk<
  GetSubjectsResponse,
  GetSubjectsRequest,
  {
    state: RootState;
    rejectValue: ApiError;
  }
>("subjects", async (req, thunkApi) => {
  const resp = await listSubjectsAsyncGet(req);
  if (!isSubjectGetSuccess(resp)) {
    thunkApi.dispatch(
      setErrorState({ error: resp.error, statusCode: resp.statusCode })
    );
    return thunkApi.rejectWithValue(resp);
  } else {
    thunkApi.dispatch(setErrorState({ error: "", statusCode: 200 }));
    return resp;
  }
});

export const subjectApiSlice = createSlice({
  name: "subjectApi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubjectsAsync.pending, (state, action) => {});
    builder.addCase(getSubjectsAsync.fulfilled, (state, action) => {
      state.loadedSubjects = action.payload.subjects;
      console.log(state.loadedSubjects);
    });
    builder.addCase(getSubjectsAsync.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const subjects = (state: RootState) => {
  return state.subjects.loadedSubjects;
};

export default subjectApiSlice.reducer;
