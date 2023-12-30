import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prismadb";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
