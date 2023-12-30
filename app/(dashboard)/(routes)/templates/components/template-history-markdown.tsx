import CopyToClipboard from "@/components/copy-to-clipboard";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const TemplateHistoryMarkdown = ({
  prompt,
  content,
}: {
  prompt: string;
  content: string;
}) => {
  const prompts = prompt.split("|");
  const contents = content.split("|");
  return (
    <div className="px-4 md:px-8 pb-6 overflow-y-auto scrollbar-hide">
      <div className="border rounded-xl p-4 space-y-4 relative">
        <div className="flex gap-4 flex-wrap divide-x-2 dark:divide-white/20">
          {prompts.map((prompt, i) => (
            <p key={i} className="text-lg font-semibold capitalize px-4">
              {prompt}
            </p>
          ))}
        </div>
        {contents.map((content, i) => (
          <div
            key={i}
            className="border p-4 rounded-xl bg-gray-50 dark:bg-gray-900"
          >
            <div className="flex justify-end ">
              <CopyToClipboard text={content} />
            </div>

            <ReactMarkdown className="prose max-w-4xl dark:prose-invert">
              {content || ""}
            </ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateHistoryMarkdown;
