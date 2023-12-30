"use client";
import React, { FC, useEffect, useState } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyToClipboard from "@/components/copy-to-clipboard";
import { Check, Clipboard } from "lucide-react";

const components: Components = {
  code({ node, inline, className, children, ...props }) {
    // const [isCopied, setIsCopied] = useState(false);

    // useEffect(() => {
    //   const timeout = setTimeout(() => {
    //     setIsCopied(false);
    //   }, 2500);

    //   return () => clearTimeout(timeout);
    // }, [isCopied]);

    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <div className="code-block relative bg-gray-900 border rounded-xl border-gray-700">
        <div className="flex justify-between px-4 h-12 items-center border-b border-gray-700">
          <p className="font-sans font-semibold">{match[1]}</p>
          {/* <button
            onClick={() => {
              navigator.clipboard.writeText(children as string);
              setIsCopied(true);
            }}
          >
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Clipboard className="h-4 w-4" />
            )}
          </button> */}
          <CopyToClipboard
            variant="ghost"
            className="text-white"
            text={children as string}
          />
        </div>
        <SyntaxHighlighter
          style={a11yDark}
          language={match[1]}
          PreTag="div"
          customStyle={{ fontSize: "1rem", background: "transparent" }}
          wrapLongLines
          //   {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

const Markdown = ({ markdown }: { markdown: string }) => {
  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={[remarkGfm]}
      className="prose dark:prose-invert max-w-full prose-pre:p-0 prose-pre:bg-transparent"
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default Markdown;
