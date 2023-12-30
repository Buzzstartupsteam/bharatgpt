import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const { title, trainId } = await req.json();

  if (!userId) {
    return new NextResponse("Unauthorized!", { status: 401 });
  }

  try {
    const analyze = await prismadb.analyze.create({
      data: {
        title,
        trainId,
        userId,
      },
    });
    return new NextResponse(JSON.stringify(analyze), { status: 200 });
  } catch (error: any) {
    console.log("[ANALYZE ERROR]", error);

    return new NextResponse("Internal Error!", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return new NextResponse("Unauthorized!", { status: 401 });
  }

  try {
    const analyze = await prismadb.analyze.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return new NextResponse(JSON.stringify(analyze), { status: 200 });
  } catch (error: any) {
    console.log("[ANALYZE ERROR]", error);

    return new NextResponse("Internal Error!", { status: 500 });
  }
};
