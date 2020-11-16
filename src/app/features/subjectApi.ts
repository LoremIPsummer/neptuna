import {
  Action,
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
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
  thunkApi.dispatch(setLoadState(true));
  return await listSubjectsAsyncGet(req).then((resp) => {
    thunkApi.dispatch(setLoadState(false));
    if (isSubjectGetSuccess(resp)) {
      thunkApi.dispatch(setErrorState({ error: "", statusCode: 200 }));
      return resp;
    } else {
      thunkApi.dispatch(
        setErrorState({ error: resp.error, statusCode: resp.statusCode })
      );
      return thunkApi.rejectWithValue(resp);
    }
  });
});

const resetInitialState = { ...initialState };

export const subjectApiSlice = createSlice({
  name: "subjectApi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubjectsAsync.fulfilled, (state, action) => {
      state.loadedSubjects = action.payload.result;
    });
    builder.addCase(getSubjectsAsync.rejected, (state, action) => {});
  },
});

export const subjects = (state: RootState) => {
  return state.subjects.loadedSubjects;
};

export default subjectApiSlice.reducer;
