import { useDispatch, useSelector } from "react-redux";
import { Meta, setLoadState } from "../app/features/loadApi";
import { subjects, getSubjectsAsync } from "../app/features/subjectApi";

export const useSubjects = () => {
  const dispatcher = useDispatch();

  return {
    subjects: useSelector(subjects),
    sync: () => {
      dispatcher(getSubjectsAsync({}));
    },
  };
};

export default useSubjects;
