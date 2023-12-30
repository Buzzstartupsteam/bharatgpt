import DeleteChatDialog from "@/components/delete-chat-dialog";
import { useChatSidebar } from "@/hooks/useChatSidebar";
import { cn } from "@/lib/utils";
import { Conversation } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Check, Edit2, Loader2, MessageSquare, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";

interface ChatListItemProps {
  conversation: Conversation;
}

const ChatListItem: FC<ChatListItemProps> = ({ conversation }) => {
  const { conversationId, title } = conversation;
  const router = useRouter();
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(title);
  const { isOpen, setIsOpen } = useChatSidebar();

  const pathname = usePathname();

  const isActive = pathname === `/conversation/${conversationId}`;

  const { mutate: editChat, isLoading: editLoading } = useMutation({
    mutationKey: ["edit conversation"],
    mutationFn: async () => {
      const { data } = await axios.patch(`/api/chats/${conversationId}`, {
        title: text,
      });
      return data;
    },
    onSuccess() {
      router.refresh();
      setIsEdit(false);
    },
    onError(error: any) {
      toast.error(error.message);
    },
  });

  return (
    <div
      className={cn(
        "flex justify-between items-center px-2 py-2 rounded-lg  gap-4 group cursor-pointer",
        isActive ? "bg-gray-100 dark:bg-gray-800" : ""
      )}
      onClick={() => {
        isOpen && setIsOpen(false),
          router.push(`/conversation/${conversationId}`);
      }}
    >
      <div className="flex items-center gap-2 w-full">
        <MessageSquare className="h-4 w-4 shrink-0" />
        {isEdit ? (
          <input
            type="text"
            placeholder="Chat name"
            className="text-sm px-1 rounded w-full bg-gray-200 dark:bg-gray-700 outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <p className="line-clamp-1 text-sm">{title}</p>
        )}
      </div>
      <div className={cn("flex gap-2", !isActive && "hidden")}>
        {editLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isEdit ? (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                editChat();
              }}
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                if (isDelete) {
                  setIsDelete(false);
                }
                if (isEdit) {
                  setIsEdit(false);
                }
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEdit(true)}>
              <Edit2 className="h-4 w-4" />
            </button>

            <DeleteChatDialog id={conversationId} />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatListItem;
