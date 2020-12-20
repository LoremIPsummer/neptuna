import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { ApiError, BaseResponse } from "../../services/axios-wrappers";
import showToast, { ToastOptions } from "../../services/toastrConfig";
import { isResponseSucceed } from "../../services/typeguards";

interface ErrorState {
  error: ApiError;
}
const initialState: ErrorState = {
  error: {
    statusCode: 200,
    error: "",
  },
};

export const errorApiSlice = createSlice({
  name: "errorApi",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ApiError | BaseResponse>) => {
      if (isResponseSucceed(action.payload)) {
        state.error.error = action.payload.result;
      } else {
        state.error.error = action.payload.error;
      }
      state.error.statusCode = action.payload.statusCode;

      if (state.error.statusCode >= 400) {
        showToast(ToastOptions.ERROR, state.error.error);
      } else if (
        isResponseSucceed(action.payload) &&
        action.payload.displayable
      )
        showToast(ToastOptions.SUCCESS, state.error.error);
    },
    resetError: (state) => {
      state.error.error = "";
      state.error.statusCode = 200;
    },
  },
  extraReducers: (builder) => {},
});

export const error = (state: RootState) => {
  return state.error.error;
};

export const { setError, resetError } = errorApiSlice.actions;

export default errorApiSlice.reducer;
