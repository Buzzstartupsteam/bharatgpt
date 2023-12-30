import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return new NextResponse("Unauthorized!", { status: 401 });
  }

  try {
    const user = await prismadb.user.findUnique({
      where: { id: userId },
      include: {
        history: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 501 });
  }
};
