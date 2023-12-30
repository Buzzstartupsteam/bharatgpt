import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface DividerProps {
  text: string;
  className?: string;
}

const Divider: FC<DividerProps> = ({ text, className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="w-full h-[1px] bg-border"></div>
      <div className="text-xs uppercase tracking-wide text-gray-700 dark:text-gray-300 shrink-0 whitespace-nowrap font-medium">
        {text}
      </div>
      <div className="w-full h-[1px] bg-border"></div>
    </div>
  );
};

export default Divider;
