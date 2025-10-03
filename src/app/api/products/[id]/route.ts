import { NextResponse } from "next/server";
import client from "../../../../../lib/mongodb";

export async function GET(req: Request, { params }: { params: Promise<{ id: number }> }) {
  try {
    const { id } = await params;
    const db = await client.connect();
    const product = await db
      .db("payment-manager")
      .collection("products")
      .findOne({ id: Number(id) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch a product" }, { status: 500 });
  }
}
