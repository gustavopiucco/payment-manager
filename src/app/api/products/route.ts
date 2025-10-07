import { NextResponse } from "next/server";
import client from "../../../../lib/mongodb";
import { Product } from "@/app/types/product";

export async function GET() {
  try {
    const db = await client.connect();
    const products = await db
      .db("payment-manager")
      .collection<Product>("products")
      .find()
      .toArray();

    return NextResponse.json(products);
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}