import { SubjectModel } from "./subject";

export interface UserModel {
  neptunaCode: string;
  firstName: string;
  lastName: string;
  motherName: string;
  bornLocation: string;
  memberSince: string;
  bornDate: string;
  role: string;
  subjects: SubjectModel[];
}
