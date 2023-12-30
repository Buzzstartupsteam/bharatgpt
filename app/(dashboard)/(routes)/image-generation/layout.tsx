import { Heading } from "@/components/heading";
import HistorySidebar from "@/components/history-sidebar";
import HistorySidebarMobile from "@/components/history-sidebar-mobile";
import { getHistory, getImageGenerationCount } from "@/lib/actions";
import { getPaginatedHistory } from "@/lib/history";
import { ImageIcon } from "lucide-react";
import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Image Generation",
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const history = await getHistory("IMAGE");
  // const history = await getPaginatedHistory("IMAGE");
  const imageGenerations = await getImageGenerationCount();
  return (
    <div className="relative h-[calc(100vh-4.5rem)] overflow-y-auto flex md:divide-x">
      <div className="flex grow overflow-y-auto flex-col">
        <div className="flex justify-between items-start pr-6">
          <Heading
            title="Image Generation"
            description="Unleash creativity with our generative AI-powered image generation tool for your content."
            icon={ImageIcon}
            iconColor="text-pink-700"
            bgColor="bg-pink-700/10"
          />
          <HistorySidebarMobile
            generateNewEndpoint="/image-generation"
            history={history}
          />
        </div>
        <p className="text-muted-foreground text-right text-sm px-4 lg:px-8">
          Image Generations : {imageGenerations}
        </p>

        {children}
      </div>

      <div className="hidden lg:block">
        <HistorySidebar
          generateNewEndpoint="/image-generation"
          history={history}
        />
      </div>
    </div>
  );
};

export default Layout;
