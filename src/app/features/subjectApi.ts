import {
  Action,
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { RootState, store } from "../store";
import { UserModel } from "../../models/user";
import { toast } from "react-toastify";
import {
  loginUserAsyncPost,
  userDataAsyncGet,
} from "../../services/userService";
import { SubjectModel } from "../../models/subject";

interface SubjectState {
  loadedSubjects: SubjectModel[];
}
const initialState: SubjectState = {
  loadedSubjects: [],
};

const resetInitialState = { ...initialState };

export const subjectApiSlice = createSlice({
  name: "subjectApi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default subjectApiSlice.reducer;
