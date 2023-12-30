import { mailer } from "@/lib/nodemailer";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  const { email, password } = await req.json();

  try {
    const user = await prismadb.user.findUnique({ where: { email } });

    if (!user || !user.email) {
      return new NextResponse("User not found!", { status: 401 });
    }

    if (!user.hashedPassword) {
      return new NextResponse("Try to login with Social Providers", {
        status: 401,
      });
    }

    const newPassword = await bcrypt.hash(password, 12);

    const updatedUser = await prismadb.user.update({
      where: { email },
      data: { hashedPassword: newPassword },
    });

    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 501 });
  }
};
