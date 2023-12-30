import { Heading } from "@/components/heading";
import { Zap } from "lucide-react";
import React, { FC } from "react";
import HistorySidebarMobile from "@/components/history-sidebar-mobile";
import HistorySidebar from "@/components/history-sidebar";
import { getHistory } from "@/lib/actions";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog-post-conclusion",
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const history = await getHistory("BLOG_POST_CONCLUSION_CLAUSE");
  return (
    <div className="relative h-[calc(100vh-4.5rem)] overflow-y-auto flex md:divide-x">
      <div className="flex grow overflow-y-auto flex-col">
        <div className="flex justify-between items-start pr-6">
          <Heading
            title="BLOG POST CONCLUSION CLAUSE"
            description="End your blog articles with a captivating concluding clause."
            icon={Zap}
            iconColor="text-gray-500 dark:text-gray-300"
            bgColor="bg-gray-100 dark:bg-gray-800"
          />
          <HistorySidebarMobile
            history={history}
            generateNewEndpoint="/templates/blog-post-conclusion-clause"
          />
        </div>

        {children}
      </div>

      <div className="hidden lg:block">
        <HistorySidebar
          history={history}
          generateNewEndpoint="/templates/blog-post-conclusion-clause"
        />
      </div>
    </div>
  );
};

export default Layout;
