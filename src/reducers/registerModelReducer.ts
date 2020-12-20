import { RegisterRequest } from "../services/axios-wrappers";

export const initialState: RegisterRequest = {
  email: "",
  password: "",
  recaptcha: "",
  firstName: "",
  lastName: "",
};

export function registerModelReducer(
  registerModel: RegisterRequest,
  action: { type: string; payload: string }
) {
  switch (action.type) {
    case "changePassword":
      return { ...registerModel, password: action.payload };
    case "changeName": {
      var firstSecond = action.payload.split(" ", 2);
      if (!firstSecond[1]) return { ...registerModel, lastName: "" };
      return {
        ...registerModel,
        firstName: firstSecond[0],
        lastName: firstSecond[1],
      };
    }

    case "changeEmail":
      return { ...registerModel, email: action.payload };
    case "changeToken":
      return { ...registerModel, recaptcha: action.payload };
    case "reset": {
      return { ...initialState };
    }
    default:
      throw new Error();
  }
}

export default registerModelReducer;
