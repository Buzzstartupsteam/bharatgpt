import { Heading } from "@/components/heading";
import { Zap } from "lucide-react";
import React, { FC } from "react";
import Sidebar from "./components/Sidebar";
import MobileSidebar from "./components/MobileSidebar";
import { getHistory } from "@/lib/actions";
import HistorySidebarMobile from "@/components/history-sidebar-mobile";
import HistorySidebar from "@/components/history-sidebar";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Youtube-video--script-hook",
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const history = await getHistory(
    "YOUTUBE_VIDEO_SCRIPT_HOOK_AND_INTRODUCTION"
  );
  return (
    <div className="relative h-[calc(100vh-4.5rem)] overflow-y-auto flex md:divide-x">
      <div className="flex grow overflow-y-auto flex-col">
        <div className="flex justify-between items-start pr-6">
          <Heading
            title="YOUTUBE VIDEO SCRIPT HOOK AND INTRODUCTION"
            description="Produce an engaging video introduction that grabs the attention of your audience and motivates them to watch till the end."
            icon={Zap}
            iconColor="text-gray-500 dark:text-gray-300"
            bgColor="bg-gray-100 dark:bg-gray-800"
          />
          <HistorySidebarMobile
            generateNewEndpoint="/templates/youtube-video-script-hook-and-introduction"
            history={history}
          />
        </div>

        {children}
      </div>

      <div className="hidden lg:block">
        <HistorySidebar
          generateNewEndpoint="/templates/youtube-video-script-hook-and-introduction"
          history={history}
        />
      </div>
    </div>
  );
};

export default Layout;
