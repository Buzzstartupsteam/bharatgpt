import { Heading } from "@/components/heading";
import { Layers } from "lucide-react";
import React, { FC } from "react";
import { getHistory } from "@/lib/actions";
import HistorySidebarMobile from "@/components/history-sidebar-mobile";
import HistorySidebar from "@/components/history-sidebar";

export const metadata = {
  title: "Summarize",
};

interface EssayLayoutProps {
  children: React.ReactNode;
}

const EssayLayout: FC<EssayLayoutProps> = async ({ children }) => {
  const history = await getHistory("SUMMARIZE");
  return (
    <div className="relative h-[calc(100vh-4.5rem)] overflow-y-auto flex md:divide-x">
      <div className="flex grow overflow-y-auto flex-col">
        <div className="flex justify-between items-start pr-6">
          <Heading
            title="Summarize"
            description="Revolutionary generative AI-powered tool that summarizes content in just one click!"
            icon={Layers}
            bgColor="bg-purple-600/20"
            iconColor="text-purple-600"
          />
          <HistorySidebarMobile
            generateNewEndpoint="/summarize"
            history={history}
          />
        </div>

        {children}
      </div>

      <div className="hidden lg:block">
        <HistorySidebar generateNewEndpoint="/summarize" history={history} />
      </div>
    </div>
  );
};

export default EssayLayout;
