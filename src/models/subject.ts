import { UserModel } from "./user";

export interface SubjectModel {
  subjectCode: string;
  subjectName: string;
  credit: number;
  teacher: UserModel;
  students: UserModel[];
}
