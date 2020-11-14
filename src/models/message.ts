import { UserModel } from "./user";

export interface MessageModel {
  id: number;
  from: UserModel;
  subject: string;
  content: string;
  time: string;
}
