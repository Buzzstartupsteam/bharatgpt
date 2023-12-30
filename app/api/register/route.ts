import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return new NextResponse("Insufficient Information!", { status: 401 });
  }

  try {
    const isUser = await prismadb.user.findUnique({ where: { email } });

    if (isUser) {
      return new NextResponse("User already exists with this email!", {
        status: 401,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error: any) {
    console.log("[REGISTER ERROR]", error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
};
