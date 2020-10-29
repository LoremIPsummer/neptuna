import { LoginRequest } from "../app/features/userWrappers";

export const initialState: LoginRequest = {
  neptunaCode: localStorage.getItem("savedCode") ?? "",
  password: "",
  recaptcha: "",
};

export function loginModelReducer(
  loginModel: LoginRequest,
  action: { type: string; payload: string }
) {
  switch (action.type) {
    case "changePassword":
      return { ...loginModel, password: action.payload };
    case "changeNeptunaCode":
      return { ...loginModel, neptunaCode: action.payload };
    case "changeToken":
      return { ...loginModel, recaptcha: action.payload };
    default:
      throw new Error();
  }
}
