import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserModel } from "../../models/user";
import {
  loginUserAsyncPost,
  userDataAsyncGet,
} from "../../services/userService";
import {
  ApiError,
  LoginRequest,
  LoginResponse,
  UserDataRequest,
  UserDataResponse,
} from "../../services/axios-wrappers";
import {
  isCurrentUserRetrieved,
  isLoginSucceed,
} from "../../services/typeguards";
import { Cookies } from "react-cookie";
import { Meta, setLoadState } from "./loadApi";
import { setErrorState } from "./errorApi";
import { push } from "connected-react-router";

const cookieManager = new Cookies();

interface UserState {
  current: UserModel;
  loadedMembers: UserModel[];
}
const initialState: UserState = {
  current: {
    id: 0,
    neptunaCode: "",
    firstName: "",
    lastName: "",
    motherName: "",
    bornLocation: "",
    memberSince: "",
    bornDate: "",
    lastlogin: "",
    role: "",
    department: "",
    bornCountry: "",
    subjects: [],
  },
  loadedMembers: [],
};

const resetInitialState = { ...initialState };

export const loginUserAsync = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  {
    state: RootState;
    rejectValue: ApiError;
  }
>("users/login", async (loginModel, thunkApi) => {
  thunkApi.dispatch(setLoadState(true, Meta.UserLogin));
  return await loginUserAsyncPost(loginModel).then((resp) => {
    thunkApi.dispatch(setLoadState(false, Meta.UserLogin));
    if (isLoginSucceed(resp)) {
      thunkApi.dispatch(setErrorState({ error: "", statusCode: 201 }));
      thunkApi.dispatch(push("/profilom"));
      return resp;
    } else {
      thunkApi.dispatch(
        setErrorState({ error: resp.error, statusCode: resp.statusCode })
      );
      return thunkApi.rejectWithValue(resp);
    }
  });
});

export const getUserDataAsync = createAsyncThunk<
  UserDataResponse,
  UserDataRequest,
  {
    state: RootState;
    rejectValue: ApiError;
  }
>("users/get/current", async (_, thunkApi) => {
  thunkApi.dispatch(setLoadState(true, Meta.UserDataFetch));
  return await userDataAsyncGet().then((resp) => {
    thunkApi.dispatch(setLoadState(false, Meta.UserDataFetch));
    if (isCurrentUserRetrieved(resp)) {
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

export const userApiSlice = createSlice({
  name: "userApi",
  initialState,
  reducers: {
    logoutUser: (state) => {
      cookieManager.remove("token");
      state.current = resetInitialState.current;
      console.log(state.current);
      console.log(resetInitialState.current);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserAsync.pending, (state) => {});
    builder.addCase(getUserDataAsync.pending, (state) => {});
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      cookieManager.set("token", action.payload.token);
    });
    builder.addCase(getUserDataAsync.fulfilled, (state, action) => {
      state.current = action.payload.user;
    });
    builder.addCase(loginUserAsync.rejected, (state, action) => {
      cookieManager.remove("token");
    });
    builder.addCase(getUserDataAsync.rejected, (state, action) => {
      state.current = initialState.current;
      if (cookieManager.get("token") === undefined) return;
    });
  },
});

export const { logoutUser } = userApiSlice.actions;

// Szelektorok

export const currentUser = (state: RootState) => {
  return state.users.current;
};

export const loggedIn = (state: RootState) => {
  return state.users.current.neptunaCode !== "";
};

export default userApiSlice.reducer;
