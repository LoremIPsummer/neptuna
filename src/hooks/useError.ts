import { useSelector, useDispatch } from "react-redux";
import { error, resetError, setError } from "../app/features/errorApi";
import { ApiError, BaseResponse } from "../services/axios-wrappers";

export const useError = () => {
  const dispatch = useDispatch();
  return {
    error: useSelector(error),
    errorMessage: useSelector(error).error,
    resetError: () => dispatch(resetError()),
    setError: (val: BaseResponse | ApiError) => dispatch(setError(val)),
  };
};

export default useError;
