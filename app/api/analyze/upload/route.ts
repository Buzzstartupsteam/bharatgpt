import { httpsAgent } from "@/lib/agent";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const formData = await req.formData();

  const trainId = formData.get("train_id");

  if (!userId) {
    return new NextResponse("Unauthorized!", { status: 401 });
  }

  try {
    const { data } = await axios.post(
      "https://75.2.24.164/v1/custom/dataviser/upload",
      formData,
      {
        headers: { authorization: process.env.AI_API_KEY },
        httpsAgent: httpsAgent,
      }
    );

    return new NextResponse(JSON.stringify(data.data.train_id), {
      status: 200,
    });
  } catch (error: any) {
    console.log("[ANALYZE ERROR]", error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
};
