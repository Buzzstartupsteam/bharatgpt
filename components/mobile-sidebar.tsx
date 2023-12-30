"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";
import { useSidebar } from "@/hooks/useSidebar";
import { ApiLimit, Plan } from "@prisma/client";

export const MobileSidebar = ({
  apiLimitCount = 0,
  limit,
  planName = "FREE",
}: {
  apiLimitCount: number;
  planName: "FREE" | Plan;
  limit: ApiLimit | undefined | null;
}) => {
  const { isOpen, setIsOpen } = useSidebar();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <Sidebar
          limit={limit}
          apiLimitCount={apiLimitCount}
          planName={planName}
        />
      </SheetContent>
    </Sheet>
  );
};
