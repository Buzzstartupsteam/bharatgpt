"use client";
import { HistoryIcon } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import { SheetContent, SheetTrigger, Sheet } from "./ui/sheet";
import { Button } from "./ui/button";
import HistorySidebar from "./history-sidebar";
import { History } from "@prisma/client";

interface HistorySidebarMobileProps {
  history: History[];
  generateNewEndpoint: string;
}

const HistorySidebarMobile: FC<HistorySidebarMobileProps> = ({
  history,
  generateNewEndpoint,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

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
        <HistorySidebar
          generateNewEndpoint={generateNewEndpoint}
          history={history}
        />
      </SheetContent>
    </Sheet>
  );
};

export default HistorySidebarMobile;
