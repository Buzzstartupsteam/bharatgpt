import { Heading } from "@/components/heading";
import { Wand2 } from "lucide-react";
import React, { FC } from "react";
import { getHistory } from "@/lib/actions";
import HistorySidebarMobile from "@/components/history-sidebar-mobile";
import HistorySidebar from "@/components/history-sidebar";

export const metadata = {
  title: "Content Writer",
};

interface ContentLayoutProps {
  children: React.ReactNode;
}

const ContentLayout: FC<ContentLayoutProps> = async ({ children }) => {
  const history = await getHistory("CONTENT");
  return (
    <div className="relative h-[calc(100vh-4.5rem)] overflow-y-auto flex md:divide-x">
      <div className="flex grow overflow-y-auto flex-col">
        <div className="flex justify-between items-start pr-6">
          <Heading
            title="Content Creator"
            description="Unleash creativity with an generative AI-powered tool for content creation."
            icon={Wand2}
            iconColor="text-orange-500"
            bgColor="bg-orange-500/10"
          />
          <HistorySidebarMobile
            generateNewEndpoint="/content-writer"
            history={history}
          />
        </div>

        {children}
      </div>

      <div className="hidden lg:block">
        <HistorySidebar
          generateNewEndpoint="/content-writer"
          history={history}
        />
      </div>
    </div>
  );
};

export default ContentLayout;
