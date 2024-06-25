import { Request } from "express";
import { IUser } from "models/userModel";

export interface ProtectedRequest extends Request {
  user: IUser;
}
