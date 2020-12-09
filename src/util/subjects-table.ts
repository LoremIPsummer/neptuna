import { SubjectModel } from "../models/subject";

export const convertSubjects = (subjects: SubjectModel[]) => {
  return subjects.map((subject) => ({
    model: subject,
    teacherName: subject.teacher
      ? subject.teacher.firstName + " " + subject.teacher.lastName
      : "Nincs kijelölt tanár",
    studentsCount: subject.students ? subject.students.length : 0,
  }));
};
