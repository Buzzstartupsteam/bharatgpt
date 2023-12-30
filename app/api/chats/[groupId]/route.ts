import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import https from "https";

export const DELETE = async (
  req: Request,
  { params: { groupId } }: { params: { groupId: string } }
) => {
  try {
    const session = await getServerSession(authOptions);

    const userId = session?.user.id;
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const res = await prismadb.conversation.delete({
      where: {
        conversationId: groupId,
        userId,
      },
    });

    const { data } = await axios.post(
      "https://75.2.24.164/api/service/llm/group-delete",
      { group_id: groupId },
      {
        headers: {
          Authorization: process.env.AI_API_KEY,
        },
        httpsAgent: agent,
      }
    );

    return new NextResponse("Chat Deleted Successfully", { status: 200 });
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (
  req: Request,
  { params: { groupId } }: { params: { groupId: string } }
) => {
  try {
    const session = await getServerSession(authOptions);

    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const res = await prismadb.conversation.findFirst({
      where: {
        conversationId: groupId,
        userId,
      },
    });

    const { data } = await axios.post(
      "https://api.metalgroundai.com/api/service/llm/history",
      { groupId },
      {
        headers: {
          Authorization: process.env.AI_API_KEY,
        },
      }
    );

    return NextResponse.json({
      role: "system",
      content: data.data,
    });
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params: { groupId } }: { params: { groupId: string } }
) => {
  try {
    const { title } = await req.json();
    const session = await getServerSession(authOptions);

    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const res = await prismadb.conversation.update({
      where: {
        conversationId: groupId,
        userId,
      },
      data: {
        title,
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
