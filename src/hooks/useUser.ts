import { useDispatch, useSelector } from "react-redux";
import {
  currentUser,
  loginUserAsync,
  getUserDataAsync,
  logoutUser,
  loggedIn,
  registerUserAsync,
  createUserAsync,
  removeUserAsync,
  getUsersAsync,
  loadedMembers,
} from "../app/features/userApi";
import {
  BaseRequest,
  CreateUserRequest,
  LoginRequest,
  RegisterRequest,
  RemoveUserRequest,
} from "../services/axios-wrappers";

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
    create: (req: CreateUserRequest) => dispatcher(createUserAsync(req)),
    deleteUser: (neptunaCode: string) =>
      dispatcher(removeUserAsync({ neptunaCode })),
    getAll: () => dispatcher(getUsersAsync({})),
    loadedMembers: useSelector(loadedMembers),
  };
};

export default useUser;
