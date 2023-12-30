"use client";
import Markdown from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatDate } from "@/lib/utils";
import { Conversation, History, HistoryType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { DotWave } from "@uiball/loaders";
import axios from "axios";
import Link from "next/link";
import React from "react";

const Page = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["chat history"],
    queryFn: async () => {
      const { data } = await axios.get<Conversation[]>(`/api/chats`);
      return data;
    },
  });
  if (isError) {
    return (
      <div className="text-center text-rose-500">
        Sorry something went wrong:(
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center ">
        <DotWave size={47} speed={1} color="rgb(14 165 233)" />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold font-orbitron">
        {" "}
        <Link href="/conversation/TmFyTq-4zlXq7JlpQhb38">Bharat Chat</Link>
      </h2>

      {data.length === 0 ? (
        <p className="text-muted-foreground">No Recent generations found!</p>
      ) : (
        data && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map(({ id, conversationId, title, createdAt }) => (
              <Link
                href={`/conversation/${conversationId}`}
                className="block p-4 rounded-lg border font-semibold text-lg"
                key={id}
              >
                {title}
              </Link>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Page;
