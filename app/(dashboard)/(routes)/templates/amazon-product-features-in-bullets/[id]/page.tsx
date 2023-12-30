"use client";
import CopyToClipboard from "@/components/copy-to-clipboard";
import { Loader } from "@/components/loader";
import { History } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { DotWave } from "@uiball/loaders";
import axios from "axios";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TemplateHistoryMarkdown from "../../components/template-history-markdown";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["history", id],
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
    <TemplateHistoryMarkdown content={data.content} prompt={data.prompt} />
  );
};

export default Page;
