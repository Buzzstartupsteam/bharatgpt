"use client";
import React, { FC, useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clipboard, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface CopyToClipboardProps {
  text: string;
  className?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "premium"
    | null
    | undefined;
}

const CopyToClipboard: FC<CopyToClipboardProps> = ({
  text,
  className,
  variant = "outline",
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyText = () => {
    window.navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isCopied) {
        setIsCopied(false);
      }
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <TooltipProvider>
      <Tooltip open={isCopied}>
        <TooltipTrigger asChild onClick={copyText}>
          <Button
            className={cn("h-auto w-auto p-2.5", className)}
            variant={variant}
            size="icon"
          >
            <Clipboard className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={5}
          className="bg-sky-500 text-white w-fit h-auto"
        >
          <p>Copied !</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyToClipboard;
