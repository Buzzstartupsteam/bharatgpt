import { Heading } from "@/components/heading";
import { Code } from "lucide-react";
import React, { FC } from "react";
import { getHistory } from "@/lib/actions";

import { Metadata } from "next";
import HistorySidebar from "@/components/history-sidebar";
import HistorySidebarMobile from "@/components/history-sidebar-mobile";
import { BarChart2 } from "lucide-react";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AnalyzeSidebar from "./components/analyze-sidebar";
import AnalyzeMobileSidebar from "./components/analyze-mobile-sidebar";

export const metadata: Metadata = {
  title: "Analyze",
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);
  const analyzeHistory = await prismadb.analyze.findMany({
    where: { userId: session?.user.id },
  });

  return (
    <div className="relative h-[calc(100vh-4.5rem)] overflow-y-auto flex md:divide-x">
      <div className="flex grow overflow-y-auto flex-col">
        <div className="flex justify-between items-start pr-6">
          <Heading
            title="Analyze"
            description="Empower your content creation with Analyze:Generative AI-powered document analysis tool."
            icon={BarChart2}
            bgColor="bg-teal-500/20"
            iconColor="text-teal-500"
          />
          <AnalyzeMobileSidebar
            generateNewEndpoint="/analyze"
            history={analyzeHistory}
          />
        </div>

        {children}
      </div>
      <div className="hidden lg:block">
        <AnalyzeSidebar
          generateNewEndpoint="/analyze"
          history={analyzeHistory}
        />
      </div>
    </div>
  );
};

export default Layout;
