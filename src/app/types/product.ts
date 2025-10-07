import { ObjectId } from "mongodb";

export type Product = {
  _id: ObjectId;
  name: string;
  price: number;
  image: string;
};

export type NewProduct = Omit<Product, "_id">;