import { ReactNode } from "react";
import { SubjectModel } from "../models/subject";
import { UserModel } from "../models/user";
import {
  ApiError,
  LoginRequest,
  RegisterRequest,
} from "../services/axios-wrappers";

export type AuthGuardProps = {
  children: ReactNode;
};

export type SubjectAreaProps = {
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

export type PaginatorProps = {
  setPage: (num: number) => void;
  next: () => void;
  previous: () => void;
  actualPageNum: number;
  pageNum: number;
};

export type BaseModalProps = {
  data: {
    title: string;
    body: string | JSX.Element;
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

export type RegisterFormProps = {
  register: (req: RegisterRequest) => void;
};

export type SubjectModalBodyProps = {
  model: SubjectModel;
};
export type SubjectPageProps = {
  title: string;
  subjects: SubjectModel[];
};

export type UserTableProps = {
  users: UserModel[];
};

export type AddPageProps = {
  Form: () => JSX.Element;
  title: string;
};
