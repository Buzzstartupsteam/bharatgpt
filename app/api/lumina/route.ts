import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { checkSubscription, getPlanName } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit, getApiLimit } from "@/lib/api-limit";
import axios from "axios";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required!", { status: 401 });
    }

    const [apiLimit, subscription] = await Promise.all([
      prismadb.apiLimit.findUnique({ where: { userId } }),
      prismadb.subscription.findUnique({ where: { userId } }),
    ]);

    if (!subscription && apiLimit && apiLimit.count === apiLimit.totalCount) {
      return new NextResponse(
        "Free trial has expired. Please upgrade to pro.",
        {
          status: 403,
        }
      );
    }

    if (
      subscription &&
      subscription.plan === "APP_CHAT" &&
      apiLimit &&
      apiLimit.count === apiLimit.totalCount
    ) {
      return new NextResponse(
        "You can't use tools except Bharat Chat in this plan!",
        {
          status: 401,
        }
      );
    }

    if (subscription && apiLimit && apiLimit.count === apiLimit.totalCount) {
      return new NextResponse("All Monthly Generations are used.", {
        status: 402,
      });
    }

    const { data } = await axios.post(
      "https://75.2.24.164/api/service/llm/lumina/v1",
      JSON.stringify({
        q: prompt,
        temperature: 0.7, // 0.7 Default Temperature | Max 2
        max_tokens: 0, // 0 default | Max 200
        app_id: process.env.AI_APP_ID,
      }),
      {
        headers: {
          authorization: process.env.AI_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (subscription?.plan !== "TOP_NOTCH_KIT") {
      await incrementApiLimit();
    }

    return new NextResponse(data.data.result);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
