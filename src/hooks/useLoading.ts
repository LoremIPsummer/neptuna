import { useSelector, useDispatch } from "react-redux";
import { isLoading, Meta, setLoadState } from "../app/features/loadApi";

export const useLoading = () => {
  const dispatcher = useDispatch();
  const loading = useSelector(isLoading);
  return {
    isLoading: loading,
    setLoading: (value: boolean, meta: Meta) =>
      dispatcher(setLoadState(value, meta)),
  };
};

export default useLoading;
