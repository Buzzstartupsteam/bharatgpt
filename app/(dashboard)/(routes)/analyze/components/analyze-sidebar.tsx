"use client";
import React, { FC } from "react";
import { Analyze, History } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import DeleteHistoryDialog from "@/components/DeleteHistoryDialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Divider from "@/components/divider";
import DeleteChat from "./delete-chat";

interface AnalyzeSidebarProps {
  history: Analyze[];
  generateNewEndpoint: string;
}

const AnalyzeSidebar: FC<AnalyzeSidebarProps> = ({
  generateNewEndpoint,
  history,
}) => {
  return (
    <aside
      className="w-64 shrink-0 py-6 px-4 h-full overflow-clip"
      id="analyze-sidebar"
    >
      <Link href={generateNewEndpoint}>
        <Button className="w-full" size="sm">
          New Chat
        </Button>
      </Link>
      <Divider className="py-4" text="Recent Chats" />
      <ScrollArea className="h-full">
        <ScrollBar />
        {history.map(({ id, title, trainId }) => (
          <SidebarItem
            key={id}
            afterDeleteUrl={generateNewEndpoint}
            id={trainId}
            title={title}
            slug={generateNewEndpoint}
          />
        ))}
      </ScrollArea>
    </aside>
  );
};

export default AnalyzeSidebar;

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
        "flex justify-between items-center px-2 py-2 rounded-lg gap-2 group w-full",
        isActive && "bg-gray-100 dark:bg-gray-800"
      )}
    >
      <p className="line-clamp-1 text-sm break-all">{title}</p>
      {isActive && <DeleteChat id={id} />}
    </Link>
  );
};
