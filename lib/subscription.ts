import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  if (!userId) {
    return false;
  }

  const userSubscription = await prismadb.subscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
};

export const getPlanName = async () => {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  if (!userId) {
    return "FREE";
  }

  const userSubscription = await prismadb.subscription.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!userSubscription) {
    return "FREE";
  }

  return userSubscription.plan;
};

export const getSubscription = async () => {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  if (!userId) {
    return;
  }

  const subscription = await prismadb.subscription.findUnique({
    where: { userId },
  });

  return subscription;
};
