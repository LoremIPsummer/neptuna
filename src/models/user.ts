import { SubjectModel } from "./subject";

export enum Role {
  Student = "Hallgató",
  Lecturer = "Oktató",
  Admin = "Adminisztrátor",
}
export interface UserModel {
  id: number;
  neptunaCode: string;
  firstName: string;
  lastName: string;
  motherName: string;
  bornLocation: string;
  memberSince: string;
  bornDate: string;
  bornCountry: string;
  department: string;
  role: Role;
  lastlogin: string;
  subjects: SubjectModel[];
}
