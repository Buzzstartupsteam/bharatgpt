import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const settingsUrl = absoluteUrl("/dashboard");

export async function POST(req: Request) {
  try {
    const {
      subscriptionPeriod,
      price,
      generations,
      planName,
      currency,
      planEnum,
      imageGenerations,
    }: {
      subscriptionPeriod: "month" | "year";
      price: number;
      generations: number;
      planName: string;
      currency: string;
      planEnum: string;
      imageGenerations: string;
    } = await req.json();

    console.log( subscriptionPeriod,
      price,
      generations,
      planName,
      currency,
      planEnum,
      imageGenerations)

    if (!subscriptionPeriod || !planName || !price || !currency || !planEnum) {
      return new NextResponse(
        `${subscriptionPeriod}  ${price}  ${generations}  ${planEnum} ${currency} ${subscriptionPeriod}`,
        { status: 401 }
      );
    }

    const units = price * 100;

    const session = await getServerSession(authOptions);

    const userId = session?.user.id;
    const email = session?.user.email;

    if (!userId || !email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userSubscription = await prismadb.subscription.findUnique({
      where: {
        userId,
      },
    });

    if (userSubscription && userSubscription.stripeCustomerId && userSubscription.plan === planEnum) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: email,

      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: planName,
              description:
                planEnum === "APP_CHAT"
                  ? "Unlimited Chat generations!"
                  : `Total Generations  ${
                      generations == null ? "Unlimited" : generations
                    }`,
            },
            unit_amount: units,
            recurring: {
              interval: subscriptionPeriod,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        planEnum,
        generations: generations ? generations : Infinity,
        imageGenerations,
        type: "subscription",
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
