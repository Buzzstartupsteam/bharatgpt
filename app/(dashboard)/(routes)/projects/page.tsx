import {
  BarChart2,
  Code,
  Folder,
  GridIcon,
  ImageIcon,
  Layers,
  LayoutGrid,
  Mail,
  MessageSquare,
  PenLine,
  Text,
  Type,
  Wand2,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import { HistoryType } from "@prisma/client";
import { cn } from "@/lib/utils";

const projectList = [
  {
    id: 1,
    title: "Bharat Chat",
    icon: MessageSquare,
    href: "/conversation/bharat-chat",
    text: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    id: 2,
    title: "Image Generation",
    icon: ImageIcon,
    type: HistoryType.IMAGE,
    href: "/projects/image-generation",
    text: "text-pink-600",
    bg: "bg-pink-600/10",
  },
  {
    id: 3,
    title: "Summarize",
    icon: Layers,
    type: HistoryType.SUMMARIZE,
    href: "/projects/summarize",
    text: "text-purple-600",
    bg: "bg-purple-600/10",
  },
  {
    id: 4,
    title: "Analyze",
    icon: BarChart2,
    type: HistoryType.ANALYZE,
    href: "/projects/analyze",
    text: "text-teal-500",
    bg: "bg-teal-500/10",
  },
  {
    id: 5,
    title: "Content Creator",
    icon: Wand2,
    type: HistoryType.CONTENT,
    href: "/projects/content-creator",
    text: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    id: 6,
    title: "Essay Writer",
    icon: PenLine,
    type: HistoryType.ESSAY,
    href: "/projects/essay-writer",
    text: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    id: 7,
    title: "Email Writer",
    icon: Mail,
    type: HistoryType.EMAIL,
    href: "/projects/email",
    text: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    id: 8,
    title: "Code Generation",
    icon: Code,
    type: HistoryType.CODE,
    href: "/projects/code-generation",
    text: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    id: 9,
    title: "Templates",
    icon: Type,
    href: "/projects/templates",
    text: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    id: 10,
    title: "All",
    icon: LayoutGrid,
    href: "/projects/all",
    text: "text-rose-500",
    bg: "bg-rose-500/10",
  },
];

export const metadata = {
  title: "Projects",
};

const ProjectsPage = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {projectList.map(({ icon: Icon, id, title, type, href, bg, text }) => (
        <Link href={href} key={id}>
          <div
            className={cn(
              "p-4 flex flex-col gap-4 rounded-xl border items-center justify-center ",
              bg,
              text
            )}
          >
            <h2 className="text-lg font-semibold">{title}</h2>
            <Icon strokeWidth={1} className="h-20 w-20" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectsPage;
