"use client";
import React, { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AnalyzeDialog from "./analyze-dialog";

interface AnalyzeMoreProps {
  train_id: string;
}

const AnalyzeMore: FC<AnalyzeMoreProps> = ({ train_id }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-12 w-12 shrink-0">
          <Plus className="h-8 w-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-4 p-4"></DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AnalyzeMore;
