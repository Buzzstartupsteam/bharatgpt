"use client";
import CopyToClipboard from "@/components/copy-to-clipboard";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { convertImageToBase64, formatDate } from "@/lib/utils";
import { History } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { DotWave } from "@uiball/loaders";
import axios from "axios";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

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
      <div className="border rounded-xl p-4 space-y-4 w-fit relative bg-gray-50 dark:bg-gray-900">
        <p className="text-xl font-semibold capitalize max-w-lg">
          {data?.prompt}
        </p>
        {data && (
          <Image
            className="w-full max-w-lg rounded-xl"
            height={1000}
            width={1000}
            src={data.content}
            alt="image"
          />
        )}
        <div className="justify-between flex items-center">
          <p className="text-xs">{formatDate(data.createdAt)}</p>
          <Button
            variant="ghost"
            size="icon"
            onClick={async () =>
              await convertImageToBase64(data.content, data.prompt)
            }
          >
            <Download size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
