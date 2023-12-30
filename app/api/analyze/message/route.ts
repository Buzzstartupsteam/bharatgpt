import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const { messages } = await req.json();

  if (!userId) {
    return new NextResponse("Unauthorized!", { status: 401 });
  }
  try {
    const message = await prismadb.message.createMany({ data: messages });
    return new NextResponse(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.log("[MESSAGES_ERROR]", error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
};
