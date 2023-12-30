import Markdown from "@/components/Markdown";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getHistory } from "@/lib/actions";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { formatDate } from "@/lib/utils";
import { History, HistoryType } from "@prisma/client";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import ReactMarkdown from "react-markdown";

const list = [
  HistoryType.IMAGE,
  HistoryType.SUMMARIZE,
  HistoryType.CODE,
  HistoryType.CONTENT,
  HistoryType.EMAIL,
  HistoryType.ESSAY,
];

const Page = async () => {
  const session = await getServerSession(authOptions);
  const getRecentHistory = async (type: HistoryType) => {
    const history = await prismadb.history.findMany({
      where: { userId: session?.user.id, type },
      take: 3,
      orderBy: { createdAt: "desc" },
    });
    return history;
  };
  const templateRequest = prismadb.history.findMany({
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
    take: 3,
  });
  const [images, summarize, code, content, email, essay, templates] =
    await Promise.all([
      ...list.map((value) => getRecentHistory(value)),
      templateRequest,
    ]);
  const analyze = await prismadb.analyze.findMany({
    where: { userId: session?.user.id },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="">
      <h2 className="text-2xl font-bold font-orbitron mb-6">All</h2>
      <div className="divide-y">
        {/* analyze */}
        <div className="space-y-4 my-4">
          <Link href="/analyze" className="text-xl font-semibold ">
            Analyze
          </Link>
          <div className="flex flex-col md:flex-row gap-4 ">
            {analyze.length === 0 ? (
              <p className="text-muted-foreground">
                No recent generations found!
              </p>
            ) : (
              analyze.map(({ trainId, title, createdAt }) => (
                <Link
                  href={`/analyze/${trainId}`}
                  className="relative flex flex-col gap-2 p-4 flex-1 border rounded-xl"
                  key={trainId}
                >
                  <p className="text-lg font-semibold">{title}</p>
                  <p className="text-xs text-muted-foreground text-right">
                    {formatDate(createdAt)}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* summarize */}
        <div className="space-y-4 py-4">
          <Link href="/summarize" className="text-xl font-semibold ">
            Summarizations
          </Link>
          <div className="grid md:grid-cols-3 gap-4 lg:gap-8">
            {summarize.length === 0 ? (
              <p className="text-muted-foreground">
                No recent generations found!
              </p>
            ) : (
              summarize.map(({ id, prompt, content, createdAt }) => (
                <Link
                  href={`/summarize/${id}`}
                  className="relative flex flex-col gap-2 p-4 border rounded-xl"
                  key={id}
                >
                  <p className="text-lg font-semibold line-clamp-1">{prompt}</p>
                  <ScrollArea className="h-72">
                    <ScrollBar />
                    <ReactMarkdown className="prose dark:prose-invert">
                      {content}
                    </ReactMarkdown>
                  </ScrollArea>
                  <p className="text-xs text-muted-foreground text-right">
                    {formatDate(createdAt)}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* images */}
        <div className="space-y-4 py-4">
          <Link href="/image-generation" className="text-xl font-semibold ">
            Image Generations
          </Link>
          <div className="flex flex-col md:flex-row gap-4">
            {images.length === 0 ? (
              <p className="text-muted-foreground">
                No recent generations found!
              </p>
            ) : (
              images.map(({ id, prompt, content, createdAt }) => (
                <Link
                  href={`/image-generation/${id}`}
                  className="relative flex flex-col gap-2 p-4 border rounded-xl"
                  key={id}
                >
                  <p className="text-lg font-semibold">{prompt}</p>
                  <Image
                    height={1000}
                    width={1000}
                    src={content}
                    alt={prompt}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {formatDate(createdAt)}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* email */}
        <div className="space-y-4 py-4">
          <Link href="/email" className="text-xl font-semibold ">
            Emails
          </Link>
          <div className="grid md:grid-cols-3 gap-4 lg:gap-8">
            {email.length === 0 ? (
              <p className="text-muted-foreground">
                No recent generations found!
              </p>
            ) : (
              email.map(({ id, prompt, content, createdAt }) => (
                <Link
                  href={`/email/${id}`}
                  className="relative flex flex-col gap-2 p-4 border rounded-xl"
                  key={id}
                >
                  <p className="text-lg font-semibold line-clamp-1">{prompt}</p>
                  <ScrollArea className="h-72">
                    <ScrollBar />
                    <ReactMarkdown className="prose dark:prose-invert">
                      {content}
                    </ReactMarkdown>
                  </ScrollArea>
                  <p className="text-xs text-muted-foreground text-right">
                    {formatDate(createdAt)}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* essay */}
        <div className="space-y-4 py-4">
          <Link href="/essay-writer" className="text-xl font-semibold ">
            Essays
          </Link>
          <div className="grid md:grid-cols-3 gap-4 lg:gap-8">
            {essay.length === 0 ? (
              <p className="text-muted-foreground">
                No recent generations found!
              </p>
            ) : (
              essay.map(({ id, prompt, content, createdAt }) => (
                <Link
                  href={`/essay/${id}`}
                  className="relative flex flex-col gap-2 p-4 border rounded-xl"
                  key={id}
                >
                  <p className="text-lg font-semibold line-clamp-1">{prompt}</p>
                  <ScrollArea className="h-72">
                    <ScrollBar />
                    <ReactMarkdown className="prose dark:prose-invert">
                      {content}
                    </ReactMarkdown>
                  </ScrollArea>
                  <p className="text-xs text-muted-foreground text-right">
                    {formatDate(createdAt)}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>
        {/* content generations */}
        <div className="space-y-4 py-4">
          <Link href="/content-writer" className="text-xl font-semibold ">
            Content Generations
          </Link>
          <div className="grid md:grid-cols-3 gap-4 lg:gap-8">
            {content.length === 0 ? (
              <p className="text-muted-foreground">
                No recent generations found!
              </p>
            ) : (
              content.map(({ id, prompt, content, createdAt }) => (
                <Link
                  href={`/content-writer/${id}`}
                  className="relative flex flex-col gap-2 p-4 border rounded-xl"
                  key={id}
                >
                  <p className="text-lg font-semibold line-clamp-1">{prompt}</p>
                  <ScrollArea className="h-72">
                    <ScrollBar />
                    <ReactMarkdown className="prose dark:prose-invert">
                      {content}
                    </ReactMarkdown>
                  </ScrollArea>
                  <p className="text-xs text-muted-foreground text-right">
                    {formatDate(createdAt)}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* code */}
        <div className="space-y-4 py-4">
          <Link href="/code" className="text-xl font-semibold ">
            Code Generations
          </Link>
          <div className="grid md:grid-cols-3 gap-4 lg:gap-8">
            {code.length === 0 ? (
              <p className="text-muted-foreground">
                No recent generations found!
              </p>
            ) : (
              code.map(({ id, prompt, content, createdAt }) => (
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
              ))
            )}
          </div>
        </div>

        {/* templates */}
        <div className="space-y-4 py-4">
          <Link href="/templates" className="text-xl font-semibold ">
            Templates
          </Link>
          <div className="grid md:grid-cols-3 gap-4 lg:gap-8">
            {templates.length === 0 ? (
              <p className="text-muted-foreground">
                No recent generations found!
              </p>
            ) : (
              templates.map(({ id, prompt, content, createdAt, type }) => (
                <Link
                  className="p-4 space-y-4 border rounded-xl"
                  href={`/templates/${type
                    .split("_")
                    .join("-")
                    .toLowerCase()}/${id}`}
                  key={id}
                >
                  <p className="capitalize">{type.split("_").join(" ")}</p>
                  <div className="capitalize line-clamp-2">{prompt}</div>
                  <ScrollArea className="h-72">
                    <ScrollBar />

                    {content.split("|").map((item, i) => (
                      <ReactMarkdown
                        key={i}
                        className="prose dark:prose-invert"
                      >
                        {item}
                      </ReactMarkdown>
                    ))}
                  </ScrollArea>
                  <p className="text-xs text-right text-muted-foreground">
                    {formatDate(createdAt)}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
