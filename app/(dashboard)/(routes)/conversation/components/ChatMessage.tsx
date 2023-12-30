import React, { FC } from "react";
import { Message } from "./Chat";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import CopyToClipboard from "@/components/copy-to-clipboard";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: FC<ChatMessageProps> = ({ message: { role, text } }) => {
  return (
    <div
      key={text + role}
      className={cn(
        "p-6 rounded-lg relative",
        role == "user"
          ? "bg-gray-100 dark:bg-gray-800"
          : "border whitespace-break-spaces"
      )}
    >
      {role === "bot" && (
        <CopyToClipboard
          className="absolute top-2 right-2"
          variant="ghost"
          text={text}
        />
      )}
      <Badge
        className={cn(
          "absolute rounded-full uppercase  -top-2.5 left-8",
          role == "user" ? "bg-sky-500" : ""
        )}
      >
        {role == "user" ? "you" : "bharat"}
      </Badge>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};

export default ChatMessage;
