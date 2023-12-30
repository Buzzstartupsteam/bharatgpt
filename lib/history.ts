import { HistoryType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prismadb from "./prismadb";

export const getPaginatedHistory = async (type: HistoryType) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!session && !userId) {
    throw new Error("Unauthorized!");
  }

  try {
    const history = await prismadb.history.findMany({
      where: {
        userId,
        type,
      },
      take: 20,
      orderBy: { createdAt: "desc" },
    });
    return history;
  } catch (error) {
    console.log(error);
    throw new Error("Internal Error!");
  }
};
