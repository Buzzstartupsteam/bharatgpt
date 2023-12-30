import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import axios from "axios";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { httpsAgent } from "@/lib/agent";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, length, format } = body;

    const session = await getServerSession(authOptions);

    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!text) {
      return new NextResponse("Query is required!", { status: 401 });
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
      "https://75.2.24.164/v1/custom/summarizer/v1",
      {
        text,
        format,
        length,
        app_id: process.env.AI_APP_ID,
      },
      {
        headers: {
          authorization: process.env.AI_API_KEY,
          "Content-Type": "application/json",
        },
        httpsAgent: httpsAgent,
      }
    );

    if (subscription?.plan !== "TOP_NOTCH_KIT") {
      await incrementApiLimit();
    }
    return NextResponse.json(data.data);
  } catch (error) {
    console.log("[SUMMARIZE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
