import { httpsAgent } from "@/lib/agent";
import { checkApiLimit, getApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { checkSubscription, getPlanName } from "@/lib/subscription";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const { prompt, num_of_image } = await req.json();

  if (!userId) {
    return new NextResponse("Unauthorized!", { status: 401 });
  }

  if (!prompt) {
    return new NextResponse("Prompt is required !", { status: 401 });
  }

  const [apiLimit, subscription] = await Promise.all([
    prismadb.apiLimit.findUnique({ where: { userId } }),
    prismadb.subscription.findUnique({ where: { userId } }),
  ]);

  if (!subscription && apiLimit && apiLimit.imageGenerations === 0) {
    return new NextResponse("Free trial has expired. Please upgrade to pro.", {
      status: 403,
    });
  }

  if (apiLimit && apiLimit.imageGenerations < num_of_image) {
    return new NextResponse("You don't have enough image generations!", {
      status: 401,
    });
  }

  if (subscription && apiLimit?.count === apiLimit?.totalCount) {
    return new NextResponse("All Monthly Generations are used.", {
      status: 402,
    });
  }

  if (
    subscription &&
    subscription.plan === "APP_CHAT" &&
    apiLimit?.imageGenerations === 0
  ) {
    return new NextResponse("You can not use image generation in this plan!", {
      status: 401,
    });
  }

  try {
    const { data } = await axios.post(
      "https://75.2.24.164/v1/custom/alpha/generate",
      {
        q: prompt,
        num_of_image,
        multilingual: 1,
        app_id: process.env.AI_APP_ID,
      },
      {
        headers: {
          Authorization: process.env.AI_API_KEY,
        },
        httpsAgent: httpsAgent,
      }
    );

    if (apiLimit && apiLimit.imageGenerations !== 0) {
      await prismadb.apiLimit.update({
        where: { userId },
        data: {
          imageGenerations:
            apiLimit.imageGenerations - (parseInt(num_of_image) ?? 1),
        },
      });
    } else {
      await prismadb.apiLimit.create({
        data: { userId, imageGenerations: 5 - parseInt(num_of_image) ?? 1 },
      });
    }
    return new NextResponse(JSON.stringify(data.data.images), { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error.message, { status: 501 });
  }
};
