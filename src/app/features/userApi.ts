import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Role, UserModel } from "../../models/user";
import {
  allUserAsyncGet,
  createUserAsyncPost,
  deleteAccountAsync,
  loginUserAsyncPost,
  registerUserAsyncPost,
  userDataAsyncGet,
} from "../../services/userService";
import {
  ApiError,
  CreateUserRequest,
  CreateUserResponse,
  GetUsersRequest,
  GetUsersResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RemoveUserRequest,
  RemoveUserResponse,
  UserDataRequest,
  UserDataResponse,
} from "../../services/axios-wrappers";
import {
  areUsersRetrieved,
  isCurrentUserRetrieved,
  isLoginSucceed,
  isRegisterSucceed,
  isUserCreated,
} from "../../services/typeguards";
import { Cookies } from "react-cookie";
import { Meta, setLoadState } from "./loadApi";
import { setError } from "./errorApi";
import { push } from "connected-react-router";
import { isUserRemoved } from "../../services/typeguards";

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
    role: Role.Student,
    department: "",
    bornCountry: "",
    subjects: [],
  },
  loadedMembers: [],
};

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
    setError(resp);
    if (isLoginSucceed(resp)) {
      thunkApi.dispatch(push("/profilom"));
      return resp;
    }
    return thunkApi.rejectWithValue(resp);
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
    thunkApi.dispatch(setError(resp));
    if (isCurrentUserRetrieved(resp)) {
      return resp;
    }
    return thunkApi.rejectWithValue(resp);
  });
});

export const registerUserAsync = createAsyncThunk<
  RegisterResponse,
  RegisterRequest,
  {
    state: RootState;
    rejectValue: ApiError;
  }
>("users/register", async (registerModel, thunkApi) => {
  thunkApi.dispatch(setLoadState(true, Meta.UserRegister));
  return await registerUserAsyncPost(registerModel).then((resp) => {
    thunkApi.dispatch(setLoadState(false, Meta.UserRegister));
    thunkApi.dispatch(setError(resp));
    if (isRegisterSucceed(resp)) {
      return resp;
    }
    return thunkApi.rejectWithValue(resp);
  });
});

export const createUserAsync = createAsyncThunk<
  CreateUserResponse,
  CreateUserRequest,
  {
    state: RootState;
    rejectValue: ApiError;
  }
>("users/create", async (createModel, thunkApi) => {
  thunkApi.dispatch(setLoadState(true, Meta.CreateUser));
  return await createUserAsyncPost(createModel).then((resp) => {
    thunkApi.dispatch(setLoadState(false, Meta.CreateUser));
    thunkApi.dispatch(setError(resp));
    if (isUserCreated(resp)) {
      return resp;
    }
    return thunkApi.rejectWithValue(resp);
  });
});

export const removeUserAsync = createAsyncThunk<
  RemoveUserResponse,
  RemoveUserRequest,
  {
    state: RootState;
    rejectValue: ApiError;
  }
>("users/delete", async (removeModel, thunkApi) => {
  thunkApi.dispatch(setLoadState(true, Meta.DeleteUser));
  return await deleteAccountAsync(removeModel).then((resp) => {
    thunkApi.dispatch(setLoadState(false, Meta.DeleteUser));
    thunkApi.dispatch(setError(resp));
    if (isUserRemoved(resp)) {
      return resp;
    }
    return thunkApi.rejectWithValue(resp);
  });
});

export const getUsersAsync = createAsyncThunk<
  GetUsersResponse,
  GetUsersRequest,
  {
    state: RootState;
    rejectValue: ApiError;
  }
>("users/getAll", async (req, thunkApi) => {
  thunkApi.dispatch(setLoadState(true, Meta.GetAllUser));
  return await allUserAsyncGet().then((resp) => {
    thunkApi.dispatch(setLoadState(false, Meta.GetAllUser));
    thunkApi.dispatch(setError(resp));
    if (areUsersRetrieved(resp)) {
      return resp;
    }
    return thunkApi.rejectWithValue(resp);
  });
});

export const userApiSlice = createSlice({
  name: "userApi",
  initialState,
  reducers: {
    logoutUser: (state) => {
      cookieManager.remove("token");
      state.current = initialState.current;
      state.loadedMembers = [];
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
    builder.addCase(getUsersAsync.fulfilled, (state, action) => {
      state.loadedMembers = action.payload.users;
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

export const loadedMembers = (state: RootState) => {
  return state.users.loadedMembers;
};

export default userApiSlice.reducer;
