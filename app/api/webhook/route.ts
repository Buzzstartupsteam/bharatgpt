import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { Plan } from "@prisma/client";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;
  // console.log(event);
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    // if payment type is payment
    if (session.metadata.type === "payment") {
      // checking for api limit
      let apiLimit = await prismadb.apiLimit.findUnique({
        where: { userId: session.metadata.userId },
      });

      if (!apiLimit) {
        apiLimit = await prismadb.apiLimit.create({
          data: { userId: session.metadata.userId },
        });
      }

      if (session.metadata.generationType === "normal") {
        await prismadb.apiLimit.update({
          where: { id: apiLimit.id, userId: apiLimit.userId },
          data: {
            totalCount: apiLimit.totalCount + 100,
          },
        });
      }
      if (session.metadata.generationType === "image") {
        await prismadb.apiLimit.update({
          where: { id: apiLimit.id, userId: apiLimit.userId },
          data: {
            imageGenerations: apiLimit.imageGenerations + 200,
          },
        });
      }
    }

    // if payment type is subscription
    if (session.metadata.type === "subscription") {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      const userSubscription = await prismadb.subscription.findUnique({
        where: { userId: session.metadata.userId },
      });

      if (!userSubscription) {
        await prismadb.subscription.create({
          data: {
            userId: session?.metadata?.userId,
            plan: session?.metadata?.planEnum as Plan,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
              subscription.current_period_end * 1000
            ),
          },
        });
      } else {
        await prismadb.subscription.update({
          where: {
            id: userSubscription.id,
          },
          data: {
            plan: session?.metadata?.planEnum as Plan,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
              subscription.current_period_end * 1000
            ),
          },
        });
      }

      const subscriptionPlan = session.metadata.planEnum as Plan;

      // Defining the geberation values based on subscription plans
      let textGenerations = 0;
      let imageGenerations = 0;

      if (subscriptionPlan === Plan.KICK_OFF_KIT) {
        textGenerations = 500;
        imageGenerations = 100;
      } else if (subscriptionPlan === Plan.PRIME_TIER_KIT) {
        textGenerations = 1500;
        imageGenerations = 300;
      } else if (subscriptionPlan === Plan.TOP_NOTCH_KIT) {
        textGenerations = 10;
        imageGenerations = 500;
      } else if (subscriptionPlan === Plan.APP_CHAT) {
        textGenerations = 0;
        // No image generations for APP_CHAT
      }

      const apiLimit = await prismadb.apiLimit.findUnique({
        where: { userId: session?.metadata?.userId },
      });
      if (!apiLimit) {
        await prismadb.apiLimit.create({
          data: {
            userId: session?.metadata?.userId,
            imageGenerations: imageGenerations + 5,
            totalCount: textGenerations + 10,
          },
        });
      } else {
        await prismadb.apiLimit.update({
          where: {
            userId: session?.metadata?.userId,
          },
          data: {
            imageGenerations: imageGenerations + 5,
            count: apiLimit.count,
            totalCount: textGenerations + 10,
          },
        });
      }
    }
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    console.log("Invoice Payment Succeeded!");

    const userSubscription = await prismadb.subscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });

    // if (userSubscription) {
    if (userSubscription.plan === "KICK_OFF_KIT") {
      const apiLimit = await prismadb.apiLimit.update({
        where: { userId: userSubscription.userId },
        data: { count: 0, totalCount: 500, imageGenerations: 100 },
      });
    } else if (userSubscription.plan === "PRIME_TIER_KIT") {
      const apiLimit = await prismadb.apiLimit.update({
        where: { userId: userSubscription.userId },
        data: { count: 0, totalCount: 1500, imageGenerations: 300 },
      });
    } else if (userSubscription.plan === "TOP_NOTCH_KIT") {
      const apiLimit = await prismadb.apiLimit.update({
        where: { userId: userSubscription.userId },
        data: { imageGenerations: 500, totalCount: 10, count: 10 },
      });
    }
    // }
  }

  return new NextResponse(null, { status: 200 });
}
