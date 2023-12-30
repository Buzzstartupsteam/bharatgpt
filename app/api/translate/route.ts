import { httpsAgent } from "@/lib/agent";
import { incrementApiLimit } from "@/lib/api-limit";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const { text, target_language } = await req.json();

  if (!userId) {
    return new NextResponse("Unauthorized!", { status: 401 });
  }
  if (!text || !target_language) {
    return new NextResponse("Insufficient Info!", { status: 401 });
  }

  try {
    const [apiLimit, subscription] = await Promise.all([
      prismadb.apiLimit.findUnique({ where: { userId } }),
      prismadb.subscription.findUnique({ where: { userId } }),
    ]);

    if (!subscription && apiLimit?.count === apiLimit?.totalCount) {
      return new NextResponse(
        "Free trial has expired. Please upgrade to pro.",
        { status: 403 }
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
      "https://75.2.24.164/api/service/translate/inference/latest",
      { text, target_language },
      {
        headers: { authorization: process.env.AI_API_KEY },
        httpsAgent: httpsAgent,
      }
    );

    if (subscription?.plan !== "TOP_NOTCH_KIT") {
      await incrementApiLimit();
    }

    return new NextResponse(data.data.translation);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(`Error: ${error.message}`, { status: 500 });
  }
};
