import React from "react";
import { useSubjects, useUser } from "../hooks";
import { SubjectModel } from "../models/subject";
import { SubjectPage } from "../pages";

export enum SubjectsType {
  Lectured,
  Applied,
  NotApplied,
  All,
}

export const withSubjectAndTitle = (type: SubjectsType) => {
  return function() {
    let title = "";
    let servedSubjects: SubjectModel[] = [];

    const { user } = useUser();
    const { subjects } = useSubjects();

    switch (type) {
      case SubjectsType.All: {
        servedSubjects = subjects;
        title = "Tantárgyak";
        break;
      }
      case SubjectsType.Lectured: {
        servedSubjects = subjects.filter(
          (subject) =>
            subject.teacher &&
            subject.teacher.firstName + " " + subject.teacher.lastName ===
              user.firstName + " " + user.lastName
        );
        title = "Oktatott tantárgyak";
        break;
      }
      case SubjectsType.Applied: {
        servedSubjects = subjects.filter((subject) =>
          user.subjects.find((usub) => usub.subjectCode === subject.subjectCode)
        );
        title = "Felvett tantárgyak";
        break;
      }
      case SubjectsType.NotApplied: {
        servedSubjects = subjects.filter((subject) =>
          user.subjects.find((usub) => usub.subjectCode !== subject.subjectCode)
        );
        title = "Tárgyfelvétel";
        break;
      }
    }
    return (
      <>
        <SubjectPage title={title} subjects={servedSubjects} />
      </>
    );
  };
};

export default withSubjectAndTitle;
