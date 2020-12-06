import { useSelector } from "react-redux";
import { error } from "../app/features/errorApi";

export const useError = () => {
  return {
    error: useSelector(error),
    errorMessage: useSelector(error).error,
  };
};

export default useError;
