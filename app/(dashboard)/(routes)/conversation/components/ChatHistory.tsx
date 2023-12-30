"use client";
import { Button } from "@/components/ui/button";
import {
  Check,
  Edit2,
  Loader2,
  MessagesSquare,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { nanoid } from "nanoid";
import Link from "next/link";
import React, { FC, useState } from "react";
import { Conversation } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import ChatListItem from "./ChatListItem";
import { useNanoId } from "@/hooks/use-id";
import { useChatSidebar } from "@/hooks/useChatSidebar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { conversationId } from "@/constants";

interface Message {
  title: string;
  groudId: string;
}

interface ChatHistoryProps {
  conversations: Conversation[];
  // id: string;
}

const ChatHistory: FC<ChatHistoryProps> = ({ conversations }) => {
  const router = useRouter();
  const params = useParams();
  const { id: conversationId } = useNanoId();

  const { mutate: addChat, isLoading } = useMutation({
    mutationKey: ["edit conversation"],
    mutationFn: async () => {
      const { data } = await axios.post(`/api/chats`, {});
      return data;
    },
    onSuccess(data, variables, context) {
      router.refresh();
    },
    onError(error: any) {
      toast.error(error.message);
    },
  });

  return (
    <div className="w-64 shrink-0 py-6 px-4 h-full overflow-clip"  id="bharat-chat-sidebar" >

      <Link href={`/conversation/${conversationId}`}>
        <Button
          className="w-full"
          size="sm"
          disabled={isLoading}
          // onClick={() => addChat()}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Plus className="h-4 w-4 mr-2" />
          )}
          New Chat
        </Button>
      </Link>

      <hr className="my-4" />

      <ScrollArea className="h-full">
      <ScrollBar />
      <div className="flex flex-col gap-1 grow">
        {conversations &&
          conversations.map((conversation) => (
            <ChatListItem key={conversation.id} conversation={conversation} />
          ))}
      </div>
      </ScrollArea>
    </div>
  );
};

export default ChatHistory;
