import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState, store } from "../store";
import { SubjectModel } from "../../models/subject";
import {
  ApiError,
  GetSubjectsRequest,
  GetSubjectsResponse,
} from "../../services/axios-wrappers";
import { listSubjectsAsyncGet } from "../../services/subjectService";
import { isSubjectGetSuccess } from "../../services/typeguards";
import { setErrorState } from "./errorApi";
import { Meta, setLoadState } from "./loadApi";

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
  thunkApi.dispatch(setLoadState(true, Meta.SubjectsFetch));
  return await listSubjectsAsyncGet(req).then((data) => {
    thunkApi.dispatch(setLoadState(false, Meta.SubjectsFetch));
    if (!isSubjectGetSuccess(data)) {
      thunkApi.dispatch(
        setErrorState({ error: data.error, statusCode: data.statusCode })
      );
      return thunkApi.rejectWithValue(data);
    } else {
      thunkApi.dispatch(setErrorState({ error: "", statusCode: 200 }));
      return data;
    }
  });
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
