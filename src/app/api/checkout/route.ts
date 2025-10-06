import { NextResponse } from "next/server";
import client from "../../../../lib/mongodb";

export async function POST() {
  try {
    //const db = await client.connect();
    //

    return NextResponse.json({});
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}