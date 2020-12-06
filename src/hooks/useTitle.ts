import { useEffect } from "react";

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title + " | Neptuna";
  }, [title]);
};

export default useTitle;
