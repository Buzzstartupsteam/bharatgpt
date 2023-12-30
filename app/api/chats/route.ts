import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

//

export const POST = async (req: Request) => {
  const { groupId, title } = await req.json();
  try {
    const session = await getServerSession(authOptions);

    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chat = await prismadb.conversation.create({
      data: {
        conversationId: groupId || nanoid(),
        title: title || "New Conversation",
        userId,
      },
    });

    return new NextResponse(JSON.stringify(chat), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Prisma Error ", error.message);
  }
};

export const GET = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const conversations = await prismadb.conversation.findMany({
      where: {
        userId,
      },
      orderBy: { createdAt: "desc" },
    });

    return new NextResponse(JSON.stringify(conversations), { status: 200 });
  } catch (error) {
    return new NextResponse("Prisma Error", { status: 500 });
  }
};
