"use client";
import CopyToClipboard from "@/components/copy-to-clipboard";
import { Loader } from "@/components/loader";
import { History } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { DotWave } from "@uiball/loaders";
import axios from "axios";
import React from "react";
import ReactMarkdown from "react-markdown";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["content generations", id],
    queryFn: async () => {
      const { data } = await axios.get<History>(`/api/history/${id}`);

      return data;
    },
  });

  if (isError) {
    return (
      <div className="grow flex items-center justify-center">
        <p className="text-lg text-red-500">Sorry something went wrong:(</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grow flex items-center justify-center">
        <DotWave size={47} speed={1} color="rgb(14 165 233)" />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 pb-6 overflow-y-auto scrollbar-hide">
      <div className="border rounded-xl p-4 space-y-4 relative">
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="uppercase">Text</h2>
            <CopyToClipboard text={data?.prompt} />
          </div>
          <ReactMarkdown className="prose max-w-full dark:prose-invert">
            {data?.prompt}
          </ReactMarkdown>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="uppercase">Output</h2>
            <CopyToClipboard text={data?.content!} />
          </div>
          <ReactMarkdown className="prose max-w-full dark:prose-invert">
            {data?.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Page;
