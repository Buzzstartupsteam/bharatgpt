import { getMessages } from "@/lib/actions";
import React from "react";
import Chat from "../components/Chat";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const messages = await getMessages(id);

  return <Chat id={id} initialMessages={messages} />;
};

export default Page;
