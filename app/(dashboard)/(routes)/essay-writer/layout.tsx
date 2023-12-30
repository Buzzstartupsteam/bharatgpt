import { Heading } from "@/components/heading";
import { PenLine, Wand2 } from "lucide-react";
import React, { FC } from "react";
import { getHistory } from "@/lib/actions";
import HistorySidebarMobile from "@/components/history-sidebar-mobile";
import HistorySidebar from "@/components/history-sidebar";

export const metadata = {
  title: "Essay Writer",
};

interface EssayLayoutProps {
  children: React.ReactNode;
}

const EssayLayout: FC<EssayLayoutProps> = async ({ children }) => {
  const history = await getHistory("ESSAY");
  return (
    <div className="relative h-[calc(100vh-4.5rem)] overflow-y-auto flex md:divide-x">
      <div className="flex grow overflow-y-auto flex-col">
        <div className="flex justify-between items-start pr-6">
          <Heading
            title="Essay Writer"
            description="Effortless essays, powered by generative AI. Unleash your writing potential today!"
            icon={PenLine}
            iconColor="text-indigo-500"
            bgColor="bg-indigo-500/10"
          />
          <HistorySidebarMobile
            generateNewEndpoint="/essay-writer"
            history={history}
          />
        </div>

        {children}
      </div>

      <div className="hidden lg:block">
        <HistorySidebar generateNewEndpoint="/essay-writer" history={history} />
      </div>
    </div>
  );
};

export default EssayLayout;
