import { Heading } from "@/components/heading";
import { Zap } from "lucide-react";
import React, { FC } from "react";
import { getHistory } from "@/lib/actions";
import HistorySidebarMobile from "@/components/history-sidebar-mobile";
import HistorySidebar from "@/components/history-sidebar";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convincing-bullet-points",
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const history = await getHistory("CONVINCING_BULLET_POINTS");

  return (
    <div className="relative h-[calc(100vh-4.5rem)] overflow-y-auto flex md:divide-x">
      <div className="flex grow overflow-y-auto flex-col">
        <div className="flex justify-between items-start pr-6">
          <Heading
            title="CONVINCING BULLET POINTS"
            description="Create compelling bullet points that can be incorporated into landing pages, emails, and other forms of communication to effectively persuade and engage the audience."
            icon={Zap}
            iconColor="text-gray-500 dark:text-gray-300"
            bgColor="bg-gray-100 dark:bg-gray-800"
          />
          <HistorySidebarMobile
            generateNewEndpoint="/templates/convincing-bullet-points"
            history={history}
          />
        </div>

        {children}
      </div>

      <div className="hidden lg:block">
        <HistorySidebar
          generateNewEndpoint="/templates/convincing-bullet-points"
          history={history}
        />
      </div>
    </div>
  );
};

export default Layout;
