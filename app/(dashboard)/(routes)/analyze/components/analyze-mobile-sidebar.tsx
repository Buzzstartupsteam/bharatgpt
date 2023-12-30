"use client";
import React, { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HistoryIcon } from "lucide-react";
import { Analyze } from "@prisma/client";
import AnalyzeSidebar from "./analyze-sidebar";

interface AnalyzeMobileSidebarProps {
  history: Analyze[];
  generateNewEndpoint: string;
}

const AnalyzeMobileSidebar: FC<AnalyzeMobileSidebarProps> = ({
  generateNewEndpoint,
  history,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button size="icon" variant="ghost" className="lg:hidden shrink-0">
          <HistoryIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 lg:hidden pt-8 w-64">
        <AnalyzeSidebar
          generateNewEndpoint={generateNewEndpoint}
          history={history}
        />
      </SheetContent>
    </Sheet>
  );
};

export default AnalyzeMobileSidebar;
