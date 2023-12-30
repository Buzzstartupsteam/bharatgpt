import React from "react";
import ReactMarkdown from "react-markdown";
import CopyToClipboard from "./copy-to-clipboard";

const OutputBox = ({ output }: { output: string }) => {
  if (!output) {
    return null;
  }
  return (
    <div className="p-4 border rounded-xl mb-4">
      <div className="flex justify-between py-2">
        <h2 className="text-xl font-semibold capitalize ">output</h2>
        <CopyToClipboard text={output} />
      </div>

      <ReactMarkdown className="prose dark:prose-invert max-w-4xl">
        {output}
      </ReactMarkdown>
    </div>
  );
};

export default OutputBox;
