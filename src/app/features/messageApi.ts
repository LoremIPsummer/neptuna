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
import { MessageModel } from "../../models/message";

interface MessageState {
  loadedMessages: MessageModel[];
}
const initialState: MessageState = {
  loadedMessages: [],
};

const resetInitialState = { ...initialState };

export const messageApiSlice = createSlice({
  name: "messageApi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default messageApiSlice.reducer;

export const messages = (state: RootState) => {
  return state.messages.loadedMessages;
};
