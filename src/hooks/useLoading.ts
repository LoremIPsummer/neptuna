import { useSelector, useDispatch } from "react-redux";
import { isLoading, setLoading } from "../app/features/loadApi";

export const useLoading = () => {
  const dispatcher = useDispatch();
  const loading = useSelector(isLoading);
  return {
    isLoading: loading,
    setLoading: (value: boolean) => dispatcher(setLoading(value)),
  };
};

export default useLoading;
