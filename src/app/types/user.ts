import { ObjectId } from "mongodb";

export type User = {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
};

export type NewUser = Omit<User, "_id">;