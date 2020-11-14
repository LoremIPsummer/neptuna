import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";

interface LoadState {
  isLoading: boolean;
}
const initialState: LoadState = {
  isLoading: false,
};

export const loadApiSlice = createSlice({
  name: "loadApi",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const setLoadState = (value: boolean): AppThunk => async (dispatch) => {
  dispatch(setLoading(value));
};

export const { setLoading } = loadApiSlice.actions;

export const isLoading = (state: RootState) => {
  return state.load.isLoading;
};

export default loadApiSlice.reducer;
