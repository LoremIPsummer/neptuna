import { createAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState, store, } from "../../app/store";
import { UserModel } from "../../models/user";
import axios, { AxiosError } from "axios";
import { LoginRequest, LoginResponse, ApiError } from "./userWrappers";
import { toast } from "react-toastify";
import { Cookies } from "react-cookie";

const cookieManager = new Cookies();

let baseUrl: string = process.env.REACT_APP_API_URL ?? "";
let authToken = cookieManager.get("token");
let axiosHeaders = authToken !== undefined
  ? { headers: { Authorization: "Bearer " + authToken }, 'Content-Type': 'application/json'} 
  : {};


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
  error: { statusCode: undefined, error: undefined },
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

export const loginUserAsync = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  {
    state: RootState;
    rejectValue: ApiError;
  }
>("users/login", async (loginModel, thunkApi) => {
  try {
    const response = await axios.post<LoginResponse>(
      `${baseUrl}/users/login`,
      loginModel
    );
    return response.data;
  } catch (err) {
    let axiosError = err as AxiosError;
    let error: ApiError = {
      error: axiosError.response?.data["errors"] ?? undefined,
      statusCode: axiosError.response?.status ?? undefined,
    };

    return thunkApi.rejectWithValue(error);
  }
});

export const getUserDataAsync = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  {
    state: RootState;
    rejectValue: ApiError;
  }
>("users/login", async (loginModel, thunkApi) => {
  try {
    const response = await axios.post<LoginResponse>(
      `${baseUrl}/users/login`,
      loginModel
    );
    return response.data;
  } catch (err) {
    let axiosError = err as AxiosError;
    let error: ApiError = {
      error: axiosError.response?.data["errors"] ?? undefined,
      statusCode: axiosError.response?.status ?? undefined,
    };

    return thunkApi.rejectWithValue(error);
  }
});

export const userApiSlice = createSlice({
  name: "userApi",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      toast.success("Sikeres belépés! Átirányítás...", toastrConf);
      cookieManager.set("token", action.payload.token );
      state.error = { error: undefined, statusCode: undefined };
      state.isLoading = false;
      
      
    });
    builder.addCase(loginUserAsync.rejected, (state, action) => {
      console.log("rejected ág");
      toast.error("Hiba történt a bejelentkezés közben!", toastrConf);
      state.error = action.payload ?? {
        error:
          "A szolgáltatás nem elérhető! Ellenőrizze az internet kapcsolatát!",
        statusCode: 503,
      };
      state.isLoading = false;
      
    });
  },
});

export const { setLoading } = userApiSlice.actions;


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
