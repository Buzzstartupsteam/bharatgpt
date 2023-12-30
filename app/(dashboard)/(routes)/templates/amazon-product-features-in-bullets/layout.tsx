import { Heading } from "@/components/heading";
import { Zap } from "lucide-react";
import React, { FC } from "react";
import HistorySidebarMobile from "@/components/history-sidebar-mobile";
import { getHistory } from "@/lib/actions";
import HistorySidebar from "@/components/history-sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amazon-product-features",
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const history = await getHistory("AMAZON_PRODUCT_FEATURES_IN_BULLETS");
  return (
    <div className="relative h-[calc(100vh-4.5rem)] overflow-y-auto flex md:divide-x">
      <div className="flex grow overflow-y-auto flex-col">
        <div className="flex justify-between items-start pr-6">
          <Heading
            title="AMAZON PRODUCT FEATURES IN BULLETS"
            description={`Generate concise and original bullet points highlighting the main features and benefits of products for Amazon listings within the "about this item" section.`}
            icon={Zap}
            iconColor="text-gray-500 dark:text-gray-300"
            bgColor="bg-gray-100 dark:bg-gray-800"
          />
          <HistorySidebarMobile
            generateNewEndpoint="/templates/amazon-product-features-in-bullets"
            history={history}
          />
        </div>

        {children}
      </div>

      <div className="hidden lg:block">
        <HistorySidebar
          generateNewEndpoint="/templates/amazon-product-features-in-bullets"
          history={history}
        />
      </div>
    </div>
  );
};

export default Layout;
