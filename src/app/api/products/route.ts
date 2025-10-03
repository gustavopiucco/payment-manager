import { NextResponse } from "next/server";
import client from "../../../../lib/mongodb";

// NextJS app router - GET /api/products to fetch all products from MongoDB, returning them as JSON or error
export async function GET() {
  try {
    const db = await client.connect();
    const products = await db
      .db("payment-manager")
      .collection("products")
      .find()
      .toArray();

    return NextResponse.json(products);
  }
  catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}