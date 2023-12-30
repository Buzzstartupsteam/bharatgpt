import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import axios from "axios";

const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a professional code writer tasked with writing codes for various purposes which are mentioned ahead. You only write codes and follow a proper code, that should be correct lexically, semantically, and syntactically correct(markdown format =```code_here```). If the coding language is not specified ahead please use python as the default language to write codes in. The following is the topic for the code to be written:",
};

export async function POST(req: Request) {
  try {
    const userId = "64e346419b000d602835e05a";
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse(
        "Free trial has expired. Please upgrade to pro.",
        { status: 403 }
      );
    }

    const { data } = await axios.post(
      "https://75.2.24.164/api/service/llm/v3",
      JSON.stringify({
        q: `You are a professional code writer tasked with writing codes for various purposes which are mentioned ahead. You only write codes and follow a proper code, that should be correct lexically, semantically, and syntactically correct(markdown format =
          code_here
          
          ). If the coding language is not specified ahead please use ${
            messages.reverse()[0]
          } as the default language to write codes in. The following is the topic for the code to be written:
          also send mongoDB login`,
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

    if (!isPro) {
      await incrementApiLimit();
    }

    return NextResponse.json({
      role: "system",
      content: data.data,
    });
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
