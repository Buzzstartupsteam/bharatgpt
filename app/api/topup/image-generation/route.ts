import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const settingsUrl = absoluteUrl("/dashboard");

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    const { currency, price } = await req.json();

    const userId = session?.user.id;
    const email = session?.user.email;

    if (!userId || !email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!currency || !price) {
      return new NextResponse("Insufficient Info!", { status: 401 });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "payment",
      billing_address_collection: "auto",
      customer_email: email,

      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: "BharatChat Image Generation Add On",
              description: `100 Image Generations`,
            },
            unit_amount: parseInt(price) * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        type: "payment",
        generationType: "image",
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
};
