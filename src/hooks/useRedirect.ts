import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

export const useRedirect = () => {
  const dispatcher = useDispatch();

  return {
    redirect: (path: string) => dispatcher(push(path)),
  };
};

export default useRedirect;
