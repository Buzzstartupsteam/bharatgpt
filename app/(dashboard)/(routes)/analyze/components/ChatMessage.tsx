import React, { FC } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import CopyToClipboard from "@/components/copy-to-clipboard";
import remarkGfm from "remark-gfm";

interface Message {
  text: string;
  role: "user" | "system";
}

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
      {role === "system" && (
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
        {role == "user" ? "you" : "analyze"}
      </Badge>
      <ReactMarkdown
        className="prose dark:prose-invert max-w-full"
        remarkPlugins={[remarkGfm]}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default ChatMessage;
