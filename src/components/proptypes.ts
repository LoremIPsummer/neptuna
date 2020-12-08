import { ReactNode } from "react";
import { SubjectModel } from "../models/subject";
import { UserModel } from "../models/user";
import { ApiError, LoginRequest } from "../services/axios-wrappers";

export type AuthGuardProps = {
  children: ReactNode;
};

export type BreadcrumbProps = {
  paths: Array<{ pathName: string; pathUrl: string }>;
};

export type ErrorDialogProps = {
  error: ApiError;
};

export type HamburgerProps = { open: boolean; toggle(): void };

export type LoginFormProps = {
  login(model: LoginRequest): void;
};

export type MessageTableProps = {
  user: UserModel;
};

export type PageContainerProps = {
  children: ReactNode;
};

export type PersonalDataTableProps = {
  user: UserModel;
};

export type SubjectTableProps = {
  models: Array<{
    model: SubjectModel;
    teacherName: string;
    studentsCount: number;
  }>;
};

export type BaseModalProps = {
  data: {
    title: string;
    body: string;
    OkMethod?: () => void;
    OkText?: string;
    CancelMethod?: () => void;
    CancelText?: string;
  };
  isShown: boolean;
  closeModal: () => void;
};

export type PageHeadingProps = {
  title: string;
  alignment?: string;
  mobileAlignment?: string;
};

export type TopInfoProps = {
  user: UserModel;
};
