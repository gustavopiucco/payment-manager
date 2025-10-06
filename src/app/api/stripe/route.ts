import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-09-30.clover" });

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    // TODO: Get product data from db
    const name = "Test Product";
    const image = "https://placehold.co/600x400/png";
    const price = 100;
    const unit_amount = Math.round(price * 100); // in cents

    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name,
              images: image ? [image] : undefined,
            },
            unit_amount,
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
