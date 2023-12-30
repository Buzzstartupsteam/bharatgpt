import BreadCrumbs from "@/components/bread-crumbs";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Folder } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

export const metadata = {
  title: "Projects",
};

interface ProjectsLayoutProps {
  children: React.ReactNode;
}

const ProjectsLayout: FC<ProjectsLayoutProps> = ({ children }) => {
  return (
    <div className="pb-6">
      <Link className="block" href="/projects">
        <Heading
          title="Projects"
          description="Your Recent Projects"
          icon={Folder}
          bgColor="bg-yellow-500/10"
          iconColor="text-yellow-500"
        />
      </Link>
      <div className="px-4 lg:px-8">
        <BreadCrumbs />

        {children}
      </div>
    </div>
  );
};

export default ProjectsLayout;
