import { getHistory } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const history = await getHistory("IMAGE");
  return (
    <div className="px-4 lg:px-8 lg:gap-6 py-6">
      <h2 className="text-3xl font-bold font-orbitron mb-6">History</h2>

      <div className="grid md:grid-cols-2 gap-4 ">
        {history.map(({ content, prompt, id }) => (
          <Link
            key={id}
            href={`/image-generation/${id}`}
            className="relative block group rounded-3xl shadow-lg dark:border overflow-hidden"
          >
            <Image
              className="hover:opacity-80 transition-opacity"
              height={1000}
              width={1000}
              src={content}
              alt={prompt}
            />
            <div className="text-sm capitalize font-semibold text-center p-6">
              {prompt}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
