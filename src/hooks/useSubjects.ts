import { useDispatch, useSelector } from "react-redux";
import { useUser } from ".";
import {
  subjects,
  getSubjects,
  applySubject,
  terminateSubject,
} from "../app/features/subjectApi";

export const useSubjects = () => {
  const dispatcher = useDispatch();
  const { sync } = useUser();

  return {
    subjects: useSelector(subjects),
    sync: () => {
      dispatcher(getSubjects({}));
    },
    apply: (subjectId: string) => {
      Promise.resolve(dispatcher(applySubject({ subjectId })))
        .then((_) => dispatcher(getSubjects({})))
        .then((_) => sync());
    },
    terminate: (subjectId: string) => {
      Promise.resolve(dispatcher(terminateSubject({ subjectId })))
        .then((_) => dispatcher(getSubjects({})))
        .then((_) => sync());
    },
  };
};

export default useSubjects;
