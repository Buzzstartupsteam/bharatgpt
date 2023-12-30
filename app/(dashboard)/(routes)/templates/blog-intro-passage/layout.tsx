import { Heading } from "@/components/heading";
import { Zap } from "lucide-react";
import React, { FC } from "react";
import Sidebar from "./components/Sidebar";
import MobileSidebar from "./components/MobileSidebar";
import HistorySidebarMobile from "@/components/history-sidebar-mobile";
import HistorySidebar from "@/components/history-sidebar";
import { getHistory } from "@/lib/actions";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog-intro-Passage",
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const history = await getHistory("BLOG_INTRO_PASSAGE");
  return (
    <div className="relative h-[calc(100vh-4.5rem)] overflow-y-auto flex md:divide-x">
      <div className="flex grow overflow-y-auto flex-col">
        <div className="flex justify-between items-start pr-6">
          <Heading
            title="BLOG INTRO PASSAGE"
            description="Unleash your creativity and overcome writer's block by allowing us to compose the introductory paragraph on your behalf."
            icon={Zap}
            iconColor="text-gray-500 dark:text-gray-300"
            bgColor="bg-gray-100 dark:bg-gray-800"
          />
          <HistorySidebarMobile
            history={history}
            generateNewEndpoint="/templates/blog-intro-passage"
          />
        </div>

        {children}
      </div>

      <div className="hidden lg:block">
        <HistorySidebar
          history={history}
          generateNewEndpoint="/templates/blog-intro-passage"
        />
      </div>
    </div>
  );
};

export default Layout;
