import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { checkSubscription, getPlanName } from "@/lib/subscription";
import {
  incrementApiLimit,
  checkApiLimit,
  getLimit,
  getApiLimit,
} from "@/lib/api-limit";
import axios from "axios";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import https from "https";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  try {
    const userId = session?.user.id;
    const body = await req.json();
    const { message, groupId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!message) {
      7;
      return new NextResponse("Messages are required", { status: 400 });
    }

    const [apiLimit, subscription] = await Promise.all([
      prismadb.apiLimit.findUnique({ where: { userId } }),
      prismadb.subscription.findUnique({ where: { userId } }),
    ]);

    if (!subscription && apiLimit && apiLimit.count === apiLimit.totalCount) {
      return new NextResponse(
        "Free trial has expired. Please upgrade to pro.",
        { status: 403 }
      );
    }

    if (
      subscription &&
      subscription.plan !== "APP_CHAT" &&
      apiLimit &&
      apiLimit.count === apiLimit.totalCount
    ) {
      return new NextResponse("All Monthly Generations are used.", {
        status: 402,
      });
    }

    const { data } = await axios.post(
      "https://75.2.24.164/api/service/llm/lumina/v1",
      {
        q: message,
        group_id: groupId || "",
        followUp: 1,
        limit: 0,
        app_id: process.env.AI_APP_ID,
      },
      {
        headers: {
          Authorization: process.env.AI_API_KEY,
        },
        httpsAgent: agent,
      }
    );

    if (
      subscription?.plan !== "APP_CHAT" &&
      subscription?.plan !== "TOP_NOTCH_KIT"
    ) {
      await incrementApiLimit();
    }

    return NextResponse.json({
      role: "system",
      content: data.data.result,
    });
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
