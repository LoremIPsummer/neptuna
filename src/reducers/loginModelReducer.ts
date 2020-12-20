import { LoginRequest } from "../services/axios-wrappers";

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
      case "reset":{
        return {...initialState};
      }
    default:
      throw new Error();
  }
}

export default loginModelReducer;