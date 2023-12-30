import React, { FC } from "react";
import Chat from "./components/Chat";
import ChatHistory from "./components/ChatHistory";
import { MessageSquare } from "lucide-react";
import { Heading } from "@/components/heading";
import { getConversation } from "@/lib/actions";
import ChatSidebar from "./components/ChatSidebar";
import BharatChatInfo from "@/components/dialogs/main-chat-info";
import BharatChatTour from "@/components/tour/main-chat-tour";

export const metadata = {
  title: "Bharat Chat",
};

interface ConversationLayoutProps {
  children: React.ReactNode;
}

const ConversationLayout: FC<ConversationLayoutProps> = async ({
  children,
}) => {
  const conversations = await getConversation();

  return (
    <>
      {/* <BharatChatInfo /> */}
      <BharatChatTour />
      <div className="relative h-[calc(100vh-4rem)] overflow-y-auto flex md:divide-x">
        <div className="flex grow overflow-y-auto flex-col">
          <div className="flex justify-between items-start pr-6">
            <Heading
              title="BHARAT Chat"
              description="Seamless conversations with BHARAT Chat, your generative AI content creation companion."
              icon={MessageSquare}
              iconColor="text-violet-500"
              bgColor="bg-violet-500/10"
              className="mb-4"
            />
            <ChatSidebar conversations={conversations} />
          </div>

          {children}
        </div>
        <div className="hidden lg:block">
          <ChatHistory conversations={conversations} />
        </div>
      </div>
    </>
  );
};

export default ConversationLayout;
