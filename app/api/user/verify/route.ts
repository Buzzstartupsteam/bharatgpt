import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { email } = await req.json();

  try {
    const user = await prismadb.user.findUnique({ where: { email } });

    if (!user) {
      return new NextResponse("User with this email not found!");
    }

    const updatedUser = await prismadb.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    });
    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.log("[VERIFY ERROR]", error);
    return new NextResponse("Internal Error!");
  }
};
