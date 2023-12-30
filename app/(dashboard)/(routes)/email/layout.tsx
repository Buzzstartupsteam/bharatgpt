import { Heading } from "@/components/heading";
import { Mail, PenLine, Wand2 } from "lucide-react";
import React, { FC } from "react";
import { getHistory } from "@/lib/actions";
import HistorySidebarMobile from "@/components/history-sidebar-mobile";
import HistorySidebar from "@/components/history-sidebar";

export const metadata = {
  title: "Email Writer",
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const history = await getHistory("EMAIL");
  return (
    <div className="relative h-[calc(100vh-4.5rem)] overflow-y-auto flex md:divide-x">
      <div className="flex grow overflow-y-auto flex-col">
        <div className="flex justify-between items-start pr-6">
          <Heading
            title="Email Writer"
            description="Effortless communication crafted by AGI: The Email Writer's ultimate tool."
            icon={Mail}
            iconColor="text-sky-500"
            bgColor="bg-sky-500/10"
          />
          <HistorySidebarMobile
            generateNewEndpoint="/email"
            history={history}
          />
        </div>

        {children}
      </div>

      <div className="hidden lg:block">
        <HistorySidebar generateNewEndpoint="/email" history={history} />
      </div>
    </div>
  );
};

export default Layout;
