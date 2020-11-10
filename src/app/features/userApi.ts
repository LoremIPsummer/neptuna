import {
  Action,
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { RootState, store } from "../../app/store";
import { UserModel } from "../../models/user";
import { toast } from "react-toastify";
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

const cookieManager = new Cookies();

const toastrConf = {
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

interface UserState {
  error: ApiError;
  isLoading: boolean;
  current: UserModel;
  loadedMembers: UserModel[];
}
const initialState: UserState = {
  error: {
    statusCode: 200,
    error: "",
  },
  isLoading: false,
  current: {
    neptunaCode: "",
    firstName: "",
    lastName: "",
    motherName: "",
    bornLocation: "",
    memberSince: "",
    bornDate: "",
    role: "",
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
  return await loginUserAsyncPost(loginModel).then((resp) => {
    return isLoginSucceed(resp) ? resp : thunkApi.rejectWithValue(resp);
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
  const response = await userDataAsyncGet();
  return isCurrentUserRetrieved(response)
    ? response
    : thunkApi.rejectWithValue(response);
});

export const userApiSlice = createSlice({
  name: "userApi",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logoutUser: (state) => {
      cookieManager.remove("token");
      state.current = resetInitialState.current;
      console.log(state.current);
      console.log(resetInitialState.current);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserDataAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      toast.success("Sikeres belépés! Átirányítás...", toastrConf);
      state.error = { error: "", statusCode: 201 };
      cookieManager.set("token", action.payload.token);
      state.isLoading = false;
    });
    builder.addCase(getUserDataAsync.fulfilled, (state, action) => {
      state.current = action.payload.result;
      state.error = { error: "", statusCode: 200 };
      state.isLoading = false;
    });
    builder.addCase(loginUserAsync.rejected, (state, action) => {
      toast.error("Hiba történt a bejelentkezés közben!", toastrConf);
      state.error = action.payload as ApiError;
      cookieManager.remove("token");
      state.isLoading = false;
    });
    builder.addCase(getUserDataAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.current = initialState.current;
      if (cookieManager.get("token") === undefined) return;
      console.log(action.payload);
      state.error = action.payload as ApiError;
    });
  },
});

export const { setLoading, logoutUser } = userApiSlice.actions;

// Szelektorok

export const currentUser = (state: RootState) => {
  return state.userApi.current;
};

export const isLoading = (state: RootState) => {
  return state.userApi.isLoading;
};

export const errorList = (state: RootState) => {
  return state.userApi.error;
};

export default userApiSlice.reducer;
