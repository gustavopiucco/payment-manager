import { ObjectId } from "mongodb";

export type Product = {
  _id: ObjectId;
  name: string;
  price: number;
  image: string;
  userId?: ObjectId | string | null;
  purchasedAt?: Date;
};

export type NewProduct = Omit<Product, "_id">;