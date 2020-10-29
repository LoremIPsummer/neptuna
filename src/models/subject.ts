import { UserModel } from "./user";

export interface SubjectModel {
  subjectCode: string;
  subjectName: string;
  teacherName: string;
  credit: number;
  students: UserModel[];
}
