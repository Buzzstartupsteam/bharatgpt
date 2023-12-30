import { Heading } from "@/components/heading";
import { Zap } from "lucide-react";
import React, { FC } from "react";
import { getHistory } from "@/lib/actions";
import HistorySidebarMobile from "@/components/history-sidebar-mobile";
import HistorySidebar from "@/components/history-sidebar";

import { Metadata } from "next";

export const metadata: Metadata = {
  title:"SEO-homepage",
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const history = await getHistory("SEO_HOMEPAGE_TITLE_AND_META_DESCRIPTIONS");
  return (
    <div className="relative h-[calc(100vh-4.5rem)] overflow-y-auto flex md:divide-x">
      <div className="flex grow overflow-y-auto flex-col">
        <div className="flex justify-between items-start pr-6">
          <Heading
            title="SEO - HOMEPAGE - TITLE AND META DESCRIPTIONS"
            description="Optimizing your website's homepage for search engines involves enhancing the title and meta descriptions."
            icon={Zap}
            iconColor="text-gray-500 dark:text-gray-300"
            bgColor="bg-gray-100 dark:bg-gray-800"
          />
          <HistorySidebarMobile
            generateNewEndpoint="/templates/seo-homepage-title-and-meta-descriptions"
            history={history}
          />
        </div>

        {children}
      </div>

      <div className="hidden lg:block">
        <HistorySidebar
          generateNewEndpoint="/templates/seo-homepage-title-and-meta-descriptions"
          history={history}
        />
      </div>
    </div>
  );
};

export default Layout;
