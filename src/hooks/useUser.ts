import { useDispatch, useSelector } from "react-redux";
import {
  currentUser,
  loginUserAsync,
  getUserDataAsync,
  logoutUser,
  loggedIn,
  registerUserAsync,
} from "../app/features/userApi";
import { LoginRequest, RegisterRequest } from "../services/axios-wrappers";

export const useUser = () => {
  const dispatcher = useDispatch();

  return {
    user: useSelector(currentUser),
    loggedIn: useSelector(loggedIn),
    sync: () => {
      dispatcher(getUserDataAsync({}));
    },
    login: (value: LoginRequest) => {
      dispatcher(loginUserAsync(value));
    },
    register: (value: RegisterRequest) => {
      dispatcher(registerUserAsync(value));
    },
    logout: () => dispatcher(logoutUser()),
  };
};

export default useUser;
