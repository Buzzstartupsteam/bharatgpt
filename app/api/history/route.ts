import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { HistoryType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const BATCH_COUNT = 20;

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const { prompt, content, type } = await req.json();

  if (!userId) {
    return new NextResponse("Unauthorized!", { status: 401 });
  }

  if (!prompt || !content || !type) {
    return new NextResponse("Insufficient Info!", { status: 401 });
  }

  try {
    const codeGeneration = await prismadb.history.create({
      data: {
        prompt,
        content,
        userId,
        type,
      },
    });

    return new NextResponse(JSON.stringify(codeGeneration), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Prisma Error: ${error.message}`, { status: 501 });
  }
};

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type");

  if (!userId) {
    return new NextResponse("Unauthorized!", { status: 401 });
  }

  try {
    let history = [];
    if (type) {
      history = await prismadb.history.findMany({
        where: { userId, type: type as HistoryType },
        orderBy: { createdAt: "desc" },
      });
    } else {
      history = await prismadb.history.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
    }

    return new NextResponse(JSON.stringify(history), { status: 200 });
  } catch (error: any) {
    console.log("HISTORY_ERROR", error);
    return new NextResponse(`Prisma Error: ${error.message}`, { status: 500 });
  }
};
