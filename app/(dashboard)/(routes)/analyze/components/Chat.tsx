"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNanoId } from "@/hooks/use-id";
import { useProModal } from "@/hooks/use-pro-modal";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, Plus, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import ReactMarkdown from "react-markdown";
import ChatMessage from "./ChatMessage";
import { Message } from "@prisma/client";
import AnalyzeMore from "./analyze-more";
import AnalyzeDialog from "./analyze-dialog";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
});

interface ChatProps {
  trainId: string;
  initialMessages: Message[] | undefined;
  analyzeId: string;
}

type NewMessage = Pick<Message, "text" | "role">;

const Chat: FC<ChatProps> = ({ initialMessages, trainId, analyzeId }) => {
  const { id: conversationId, resetId } = useNanoId();
  const { onOpen } = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<NewMessage[] | []>(
    initialMessages || []
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const divRef = useRef<HTMLDivElement>(null);

  const { mutate, isLoading } = useMutation({
    mutationKey: ["conversation"],
    onMutate(variables) {
      form.reset();
    },
    mutationFn: async ({ text }: { text: string }) => {
      const { data } = await axios.post("/api/analyze/ask", {
        prompt: text,
        train_id: trainId,
        mode: "moderate",
      });
      type RequestMessage = Pick<Message, "analyzeId" | "role" | "text">;
      const messages: RequestMessage[] = [
        { analyzeId, role: "user", text },
        { analyzeId, role: "system", text: data.data },
      ];
      await axios.post("/api/analyze/message", {
        messages,
      });
      return data;
    },
    onSuccess(data, variables, context) {
      router.refresh();
      setMessages([
        ...messages,
        {
          role: "system",
          text: data.data,
        },
      ]);

      form.reset();
    },
    onError(error: any, variables) {
      console.log(error);
      if (error?.response?.status === 403) {
        onOpen();
      } else if (error?.response?.status === 402) {
        toast.error(error?.response?.data);
      } else {
        toast.error(error.message);
      }

      const newMessages = messages.slice();
      newMessages.pop();
      setMessages(newMessages);
      form.setValue("prompt", variables.text);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setMessages([...messages, { role: "user", text: values.prompt }]);
    mutate({ text: values.prompt });
  };

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="grow flex flex-col overflow-y-auto">
      {/* conversation */}
      <div className="space-y-6 px-4 lg:px-8 w-full grow overflow-y-auto scrollbar-hide pt-4">
        {messages.map((message, i) => (
          <ChatMessage key={i} message={message} />
        ))}

        {isLoading && (
          <div
            className={cn(
              "p-6 rounded-lg relative",

              "border whitespace-break-spaces"
            )}
          >
            <Badge
              className={cn("absolute rounded-full uppercase  -top-2.5 left-8")}
            >
              analyze
            </Badge>

            <div className="h-4 w-60 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          </div>
        )}
        <div ref={divRef}></div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="py-4 px-6 md:px-8 border-t bg-white dark:bg-gray-950"
        >
          <div className="flex gap-4">
            <AnalyzeDialog train_id={trainId} />
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className="h-auto p-3.5"
                      placeholder="Send your message..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="shrink-0 h-12 w-12"
              type="submit"
              size="icon"
              variant="premium"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Chat;
