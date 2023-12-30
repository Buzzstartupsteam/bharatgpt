import DashboardInfo from "@/components/dialogs/dashboard-info";
import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default Layout;
