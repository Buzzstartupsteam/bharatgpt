import { Heading } from "@/components/heading";
import { Zap } from "lucide-react";
import React, { FC } from "react";
import HistorySidebar from "@/components/history-sidebar";
import HistorySidebarMobile from "@/components/history-sidebar-mobile";
import { getHistory } from "@/lib/actions";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Powerful-title",
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const history = await getHistory("POWERFUL_TITLE");
  return (
    <div className="relative h-[calc(100vh-4.5rem)] overflow-y-auto flex md:divide-x">
      <div className="flex grow overflow-y-auto flex-col">
        <div className="flex justify-between items-start pr-6">
          <Heading
            title="POWERFUL TITLE"
            description="With expertise derived from renowned copywriters, this template guarantees the generation of powerful headlines that drive conversions for your business."
            icon={Zap}
            iconColor="text-gray-500 dark:text-gray-300"
            bgColor="bg-gray-100 dark:bg-gray-800"
          />
          <HistorySidebarMobile
            generateNewEndpoint="/templates/powerful-title"
            history={history}
          />
        </div>

        {children}
      </div>

      <div className="hidden lg:block">
        <HistorySidebar
          generateNewEndpoint="/templates/powerful-title"
          history={history}
        />
      </div>
    </div>
  );
};

export default Layout;
