import React, { FC } from "react";
import Markdown from "./Markdown";
import CopyToClipboard from "./copy-to-clipboard";

interface MultipleOutputProps {
  outputs: string[];
}

const MultipleOutput: FC<MultipleOutputProps> = ({ outputs }) => {
  if (!outputs || outputs.length == 0) {
    return null;
  }

  return (
    <div className="p-4 border rounded-xl space-y-4">
      <h2 className="font-semibold text-xl">Output</h2>

      <div className="flex flex-col gap-4">
        {outputs.map(
          (output, i) =>
            output && (
              <div
                key={i}
                className=" bg-gray-50 dark:bg-gray-900 p-4 rounded-xl"
              >
                <div className="flex justify-end w-full">
                  <CopyToClipboard text={output} />
                </div>
                <Markdown markdown={output} />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default MultipleOutput;
