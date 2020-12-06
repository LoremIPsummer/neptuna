import { ReactNode } from "react";
import { SubjectModel } from "../models/subject";
import { UserModel } from "../models/user";
import { ApiError, LoginRequest } from "../services/axios-wrappers";

export type AuthGuardProps = {
  children: ReactNode;
};

export type BreadcrumbProp = {
  paths: Array<{ pathName: string; pathUrl: string }>;
};

export type ErrorDialogProp = {
  error: ApiError;
};

export type HamburgerProp = { open: boolean; toggle(): void };

export type LoginFormProps = {
  login(model: LoginRequest): void;
};

export type MessageTableProp = {
  user: UserModel;
};

export type PageContainerProps = {
  children: ReactNode;
};

export type PersonalDataTableProp = {
  user: UserModel;
};

export type SubjectTableProps = {
  models: Array<{
    model: SubjectModel;
    teacherName: string;
    studentsCount: number;
  }>;
  model: SubjectModel;
  teacherName: string;
  studentsCount: number;
};
