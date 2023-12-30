import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";
import axios from "axios";
import { Message } from "@/app/(dashboard)/(routes)/conversation/components/Chat";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { HistoryType } from "@prisma/client";
import { httpsAgent } from "./agent";

export const getConversation = async () => {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const conversations = await prismadb.conversation.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return conversations;
  } catch (error: any) {
    throw new Error("Prisma error", error.message);
  }
};

export const getMessages = async (id: string) => {
  try {
    const { data } = await axios.post(
      "https://75.2.24.164/api/service/llm/history",
      { group_id: id },
      {
        headers: {
          Authorization: process.env.AI_API_KEY,
        },
        httpsAgent: httpsAgent,
      }
    );

    const messages = data.data as { query: string; response: string }[];
    messages.reverse();

    var newMessages: Message[] = [];

    for (let i = 0; i < messages.length; i++) {
      newMessages.push({ role: "user", text: messages[i].query });
      newMessages.push({ role: "bot", text: messages[i].response });
    }

    return newMessages;
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
};

export const getHistory = async (type: HistoryType) => {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const history = await prismadb.history.findMany({
      where: { userId, type },
      orderBy: { createdAt: "desc" },
    });
    return history;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createHistory = async ({
  prompt,
  content,
  type,
}: {
  prompt: string;
  content: string;
  type: HistoryType;
}) => {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const history = await prismadb.history.create({
      data: { prompt, content, type, userId },
    });
    return history;
  } catch (error: any) {
    console.log(error);
    throw new Error("Prisma Error:", error.message);
  }
};

// export const getTemplateHistory = async (slug: string) => {
//   const session = await getServerSession(authOptions);

//   const userId = session?.user.id;

//   if (!userId) {
//     throw new Error("Unauthorized");
//   }

//   try {
//     const templateHistory = await prismadb.templateHistory.findMany({
//       where: { templateSlug: slug },
//     });
//     return templateHistory;
//   } catch (error: any) {
//     throw new Error("Prisma Error:", error.message);
//   }
// };

export const getImageGenerationCount = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!session && !userId) {
    return 5;
  }
  try {
    const apiLimit = await prismadb.apiLimit.findUnique({ where: { userId } });

    if (!apiLimit) {
      return 5;
    }
    return apiLimit.imageGenerations;
  } catch (error) {
    return 5;
  }
};
