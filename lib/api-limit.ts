import { auth } from "@clerk/nextjs";
import { getServerSession } from "next-auth";
import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/constants";
import { authOptions } from "./auth";

export const incrementApiLimit = async () => {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  if (!session || !userId) {
    return;
  }

  const apiLimit = await prismadb.apiLimit.findUnique({
    where: { userId },
  });

  if (apiLimit) {
    await prismadb.apiLimit.update({
      where: { userId: userId },
      data: { count: apiLimit.count + 1 },
    });
  } else {
    await prismadb.apiLimit.create({
      data: { userId, count: 1 },
    });
  }
};

export const checkApiLimit = async () => {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  if (!userId) {
    return false;
  }

  const apiLimit = await prismadb.apiLimit.findUnique({
    where: { userId: userId },
  });

  if (!apiLimit || apiLimit.count < (apiLimit.totalCount || MAX_FREE_COUNTS)) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async () => {
  const session = await getServerSession(authOptions);
  
  const userId = session?.user.id;
  console.log("userId - ",userId)
  if (!userId) {
    return 0;
  }
  
  const apiLimit = await prismadb.apiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!apiLimit) {
    return 0;
  }

  return apiLimit.count;
};

export const getLimit = async () => {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  if (!userId) {
    return;
  }

  const apiLimit = await prismadb.apiLimit.findUnique({ where: { userId } });

  return apiLimit;
};

export const getApiLimit = async () => {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  if (!userId) {
    return { count: 0, totalCount: 0 };
  }

  const apiLimit = await prismadb.apiLimit.findUnique({ where: { userId } });

  return { count: apiLimit?.count, totalCount: apiLimit?.totalCount };
};
