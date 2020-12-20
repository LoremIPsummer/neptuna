import { useDispatch, useSelector } from "react-redux";
import { useUser } from ".";
import {
  subjects,
  getSubjects,
  applySubject,
  terminateSubject,
  deleteSubject,
  createSubject,
} from "../app/features/subjectApi";
import { CreateSubjectRequest } from "../services/axios-wrappers";

export const useSubjects = () => {
  const dispatcher = useDispatch();
  const { sync } = useUser();

  return {
    subjects: useSelector(subjects),
    deleteSub: (subjectCode: string) => {
      Promise.resolve(dispatcher(deleteSubject({ subjectCode })))
        .then((_) => dispatcher(getSubjects({})))
        .then((_) => sync());
    },
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
    create: (req: CreateSubjectRequest) => {
      dispatcher(createSubject(req));
    },
  };
};

export default useSubjects;
