import Markdown from "@/components/Markdown";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getHistory } from "@/lib/actions";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { formatDate } from "@/lib/utils";
import { HistoryType } from "@prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import slugify from "slugify";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const history = await prismadb.history.findMany({
    where: {
      userId: session?.user.id,
      type: {
        notIn: [
          "CODE",
          "ANALYZE",
          "IMAGE",
          "CONTENT",
          "EMAIL",
          "ESSAY",
          "SUMMARIZE",
        ],
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });
  return (
    <div>
      <h2 className="text-2xl font-bold font-orbitron">All</h2>
      {history.length === 0 ? (
        <p className="text-muted-foreground">No recent generations found!</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {history.map(({ prompt, id, content, createdAt, type }) => (
            <Link
              className="flex flex-1"
              href={`/templates/${type
                .split("_")
                .join("-")
                .toLowerCase()}/${id}`}
              key={id}
            >
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl space-y-4">
                <h3 className="capitalize">{type.split("_").join(" ")}</h3>
                <div className="capitalize line-clamp-2">{prompt}</div>
                <ScrollArea className="h-72">
                  <ScrollBar />

                  {content.split("|").map((item, i) => (
                    <ReactMarkdown key={i} className="prose dark:prose-invert">
                      {item}
                    </ReactMarkdown>
                  ))}
                </ScrollArea>
                <p className="text-muted-foreground text-right text-sm">
                  {formatDate(createdAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
