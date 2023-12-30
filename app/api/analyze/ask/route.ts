import { incrementApiLimit } from "@/lib/api-limit";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import https from "https";
import { httpsAgent } from "@/lib/agent";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const { prompt, train_id, mode } = await req.json();

  if (!userId) {
    return new NextResponse("Unauthorized!", { status: 401 });
  }

  const [apiLimit, subscription] = await Promise.all([
    prismadb.apiLimit.findUnique({ where: { userId } }),
    prismadb.subscription.findUnique({ where: { userId } }),
  ]);

  if (!subscription && apiLimit && apiLimit.count === apiLimit.totalCount) {
    return new NextResponse("Free trial has expired. Please upgrade to pro.", {
      status: 403,
    });
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

  try {
    const { data } = await axios.post(
      "https://75.2.24.164/v1/custom/dataviser/v1",
      {
        prompt,
        train_id,
        mode: mode ?? "moderate",
        followup: 1,
        app_id: process.env.AI_APP_ID,
      },
      {
        headers: { authorization: process.env.AI_API_KEY },
        httpsAgent: httpsAgent,
      }
    );
    if (subscription?.plan !== "TOP_NOTCH_KIT") {
      await incrementApiLimit();
    }
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
};
