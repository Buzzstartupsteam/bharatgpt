"use client";
import CopyToClipboard from "@/components/copy-to-clipboard";
import { Loader } from "@/components/loader";
import { History } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { DotWave } from "@uiball/loaders";
import axios from "axios";
import React from "react";
import ReactMarkdown from "react-markdown";
import Markdown from "../../../../../components/Markdown";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["code generations"],
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
      <div className="border rounded-xl p-6 space-y-4 relative bg-gray-50 dark:bg-gray-900">
        <div className="absolute top-4 right-4">
          <CopyToClipboard text={data?.content!} />
        </div>
        <p className="text-xl font-semibold capitalize">{data?.prompt}</p>
        {/* <ReactMarkdown
          components={{
            pre: ({ node, ...props }) => (
              <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                <pre {...props} />
              </div>
            ),
            code: ({ node, ...props }) => (
              <code className="bg-black/10 rounded-lg p-1" {...props} />
            ),
          }}
          className="text-sm overflow-hidden leading-7"
        >
          {data?.content || ""}
        </ReactMarkdown> */}
        <Markdown markdown={data.content} />
      </div>
    </div>
  );
};

export default Page;
