import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params: { id } }: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return new NextResponse("Unauthorized!", { status: 401 });
  }

  try {
    const code = await prismadb.history.findUnique({
      where: { id, userId },
    });

    return new NextResponse(JSON.stringify(code), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 501 });
  }
};

export const DELETE = async (
  req: Request,
  { params: { id } }: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return new NextResponse("Unauthorized!", { status: 401 });
  }

  try {
    const code = await prismadb.history.delete({
      where: { id, userId },
    });

    return new NextResponse(JSON.stringify(code), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 501 });
  }
};
