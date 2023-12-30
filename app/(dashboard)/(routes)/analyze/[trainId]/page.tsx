import React from "react";
import Chat from "../components/Chat";
import prismadb from "@/lib/prismadb";

const Page = async ({
  params: { trainId },
}: {
  params: { trainId: string };
}) => {
  const analyze = await prismadb.analyze.findUnique({
    where: { trainId },
    include: { Messages: true },
  });

  return (
    <Chat
      initialMessages={analyze?.Messages}
      trainId={trainId}
      analyzeId={analyze?.id!}
    />
  );
};

export default Page;
