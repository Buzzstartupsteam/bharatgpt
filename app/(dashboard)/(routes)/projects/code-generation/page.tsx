"use client";
import Markdown from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatDate } from "@/lib/utils";
import { History, HistoryType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { DotWave } from "@uiball/loaders";
import axios from "axios";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["code history"],
    queryFn: async () => {
      const { data } = await axios.get<History[]>(
        `/api/history?type=${HistoryType.CODE}`
      );
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
        <Link href="/code">Code Generation</Link>
      </h2>

      {data.length === 0 ? (
        <p className="text-muted-foreground">No recent generations found!</p>
      ) : (
        data && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map(({ id, content, prompt, createdAt }) => (
              <Link
                href={`/code/${id}`}
                className="p-4 space-y-4 border rounded-xl"
                key={id}
              >
                <p className="font-semibold capitalize line-clamp-1">
                  {prompt}
                </p>
                <ScrollArea className="h-72">
                  <ScrollBar />
                  <Markdown markdown={content} />
                </ScrollArea>
                <p className="text-xs text-right text-muted-foreground">
                  {formatDate(createdAt)}
                </p>
              </Link>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Page;
