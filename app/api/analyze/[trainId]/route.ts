import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params: { trainId } }: { params: { trainId: string } }
) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return new NextResponse("Unauthorized!", { status: 401 });
  }

  try {
    const analyze = await prismadb.analyze.delete({ where: { trainId } });
    return new NextResponse(JSON.stringify(analyze), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Internal Error !", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params: { trainId } }: { params: { trainId: string } }
) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const { title } = await req.json();

  if (!userId) {
    return new NextResponse("Unauthorized!", { status: 401 });
  }

  try {
    const analyze = await prismadb.analyze.update({
      where: { trainId },
      data: { title },
    });
    return new NextResponse(JSON.stringify(analyze), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Internal Error !", { status: 500 });
  }
};
