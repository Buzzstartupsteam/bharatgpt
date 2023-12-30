"use client";
import React, { FC } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ChatHistory from "./ChatHistory";
import { Conversation } from "@prisma/client";
import { MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatSidebar } from "@/hooks/useChatSidebar";

interface ChatSidebarProps {
  conversations: Conversation[];
}

const ChatSidebar: FC<ChatSidebarProps> = ({ conversations }) => {
  const { isOpen, setIsOpen } = useChatSidebar();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <Button className="shrink-0" variant="ghost" size="icon">
          <MessagesSquare size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="lg:hidden p-0 w-64 pt-8 pb-6">
        <ChatHistory conversations={conversations} />
      </SheetContent>
    </Sheet>
  );
};

export default ChatSidebar;
