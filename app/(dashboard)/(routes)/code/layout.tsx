import { Heading } from "@/components/heading";
import { Code } from "lucide-react";
import React, { FC } from "react";
import { getHistory } from "@/lib/actions";

import { Metadata } from "next";
import HistorySidebar from "@/components/history-sidebar";
import HistorySidebarMobile from "@/components/history-sidebar-mobile";

export const metadata: Metadata = {
  title: "Code",
};

interface CodeLayoutProps {
  children: React.ReactNode;
}

const CodeLayout: FC<CodeLayoutProps> = async ({ children }) => {
  const history = await getHistory("CODE");

  return (
    <div className="relative h-[calc(100vh-4.5rem)] overflow-y-auto flex md:divide-x">
      <div className="flex grow overflow-y-auto flex-col">
        <div className="flex justify-between items-start pr-6">
          <Heading
            title="Code Generation"
            description="Effortlessly create code with precision using generative AI-powered Code Generation."
            icon={Code}
            iconColor="text-green-700"
            bgColor="bg-green-700/10"
          />
          <HistorySidebarMobile generateNewEndpoint="/code" history={history} />
        </div>

        {children}
      </div>
      <div className="hidden lg:block">
        <HistorySidebar generateNewEndpoint="/code" history={history} />
      </div>
    </div>
  );
};

export default CodeLayout;
