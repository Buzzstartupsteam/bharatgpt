import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { History } from "@prisma/client";
import { AlignRight } from "lucide-react";
import React, { FC } from "react";

import Sidebar from "./Sidebar";

const EssaySidebarMobile = ({}) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button className="shrink-0" size="icon">
          <AlignRight size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="md:hidden p-0 w-64 pt-8 pb-6">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default EssaySidebarMobile;
