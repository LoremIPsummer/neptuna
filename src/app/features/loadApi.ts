import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";

export enum Meta {
  UserLogin = "User Login",
  UserDataFetch = "User Data Fetch",
  SubjectsFetch = "Subjects Fetch",
  ResendEmail = "Resend email sending",
  SubjectApply = "Applying for a subject",
  TerminateSubject = "Remove subject from user",
  UserRegister = "User Register",
}

interface LoadState {
  loadMetas: Meta[];
}
const initialState: LoadState = {
  loadMetas: [],
};

export const loadApiSlice = createSlice({
  name: "loadApi",
  initialState,
  reducers: {
    setLoading: (
      state,
      action: PayloadAction<{ meta: Meta; isLoad: boolean }>
    ) => {
      if (
        !state.loadMetas.includes(action.payload.meta) &&
        !action.payload.isLoad
      )
        return;
      else if (
        state.loadMetas.includes(action.payload.meta) &&
        !action.payload.isLoad
      )
        state.loadMetas = state.loadMetas.filter(
          (meta) => meta !== action.payload.meta
        );
      else if (
        !state.loadMetas.includes(action.payload.meta) &&
        action.payload.isLoad
      )
        state.loadMetas.push(action.payload.meta);
    },
  },
  extraReducers: (builder) => {},
});

export const setLoadState = (isLoad: boolean, meta: Meta): AppThunk => async (
  dispatch
) => {
  dispatch(setLoading({ meta, isLoad }));
};

export const { setLoading } = loadApiSlice.actions;

export const isLoading = (state: RootState) => {
  return state.load.loadMetas.length !== 0;
};

export default loadApiSlice.reducer;
