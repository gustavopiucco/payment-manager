import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import client from "../../../../lib/mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-09-30.clover" });

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    const db = await client.connect();
    const product = await db
      .db("payment-manager")
      .collection("products")
      .findOne({ id: id });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: product.name,
              images: product.image ? [product.image] : undefined,
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: 1,
        },
      ],
      after_completion: {
        type: "redirect",
        redirect: {
          url: `${process.env.NEXT_PUBLIC_APP_URL}/order/success`,
        },
      },
      allow_promotion_codes: true,
      automatic_tax: { enabled: false },
    });

    return NextResponse.json({ url: paymentLink.url }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Fail to create Stripe Payment Link" }, { status: 500 });
  }
}
