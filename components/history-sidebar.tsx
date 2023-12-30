"use client";
import React, { FC, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import Divider from "./divider";
import { History, HistoryType } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import DeleteHistoryDialog from "@/components/DeleteHistoryDialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface ResponseType {
  nextCursor: string | null;
  history: History[];
}

interface HistorySidebarProps {
  history: History[];
  generateNewEndpoint: string;
}

const HistorySidebar: FC<HistorySidebarProps> = ({
  generateNewEndpoint,
  history,
}) => {
  // const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
  //   useInfiniteQuery({
  //     queryKey: ["images"],
  //     queryFn: async ({ pageParam }) => {
  //       const { data } = await axios.get<ResponseType>(
  //         `/api/history?type=${HistoryType.IMAGE}${
  //           pageParam ? "&cursor=" + pageParam : ""
  //         }`
  //       );
  //       return data;
  //     },
  //     getNextPageParam: (lastPage) => lastPage.nextCursor,
  //   });
  // const scrollRef = useRef<HTMLDivElement>(null);

  // console.log(data);
  // console.log(hasNextPage);

  return (
    <aside
      className="w-64 shrink-0 py-6 px-4 h-full overflow-clip"
      id="sidebar"
    >
      <Link href={generateNewEndpoint}>
        <Button className="w-full" size="sm">
          Generate New
        </Button>
      </Link>
      <Divider className="py-4" text="Recent Generations" />
      <ScrollArea className="h-full">
        <ScrollBar />
        {history.map(({ id, prompt }) => (
          <SidebarItem
            key={id}
            afterDeleteUrl={generateNewEndpoint}
            id={id}
            title={prompt}
            slug={generateNewEndpoint}
          />
        ))}
      </ScrollArea>
    </aside>
  );
};

export default HistorySidebar;

interface SidebarItemProps {
  id: string;
  afterDeleteUrl: string;
  title: string;
  slug: string;
}

const SidebarItem: FC<SidebarItemProps> = ({
  id,
  title,
  afterDeleteUrl,
  slug,
}) => {
  const pathname = usePathname();
  const isActive = pathname === `${slug}/${id}`;
  return (
    <Link
      href={`${slug}/${id}`}
      className={cn(
        "flex justify-between items-center px-2 py-2 rounded-lg gap-4 group",
        isActive ? "bg-gray-100 dark:bg-gray-800" : ""
      )}
    >
      <p className="line-clamp-1 text-sm break-all">{title}</p>
      {isActive && (
        <DeleteHistoryDialog id={id} onSuccessEndpoint={afterDeleteUrl} />
      )}
    </Link>
  );
};
