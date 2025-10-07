import { NextRequest, NextResponse } from "next/server";
import client from "../../../../../lib/mongodb";
import { Product } from "@/app/types/product";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = await client.connect();
    const product = await db
      .db("payment-manager")
      .collection<Product>("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch a product" }, { status: 500 });
  }
}
