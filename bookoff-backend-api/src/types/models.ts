import { Types } from "mongoose";

export interface IGetAllProduct {
  page: number;
  limit: number;
}
export interface IStaff {
  _id: Types.ObjectId;
  first_name: string;
  last_name: string;
  phone: string;
  email: number;
  password: string;
}
