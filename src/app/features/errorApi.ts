import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { ApiError } from "../../services/axios-wrappers";


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
    setError: (state, action: PayloadAction<ApiError>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const error = (state: RootState) => {
  return state.error.error;
};

export const setErrorState = (value: ApiError): AppThunk => async (
  dispatch
) => {
  dispatch(setError(value));
};

export const { setError } = errorApiSlice.actions;

export default errorApiSlice.reducer;
