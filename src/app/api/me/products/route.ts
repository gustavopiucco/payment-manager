import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { Product } from "@/types/product";
import { getAuthUser } from "@/utils/auth";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const authUser = await getAuthUser();

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await client.connect();
    const products = await db
      .db("payment-manager")
      .collection<Product>("products")
      .find({ userId: new ObjectId(authUser.sub) })
      .toArray();

    return NextResponse.json(products);
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}