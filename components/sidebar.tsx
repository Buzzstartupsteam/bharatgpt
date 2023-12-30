"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  BarChart2,
  Code,
  DollarSign,
  Folder,
  Home,
  ImageIcon,
  Layers,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Music,
  PenLine,
  RefreshCcw,
  Settings,
  Star,
  Type,
  VideoIcon,
  Wand2,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { FreeCounter } from "@/components/free-counter";
import { nanoid } from "nanoid";
import { useNanoId } from "@/hooks/use-id";
import { useSidebar } from "@/hooks/useSidebar";
import { ApiLimit, Plan } from "@prisma/client";

export const Sidebar = ({
  apiLimitCount = 0,
  planName,
  limit,
}: {
  apiLimitCount: number;
  planName: "FREE" | Plan;
  limit: ApiLimit | undefined | null;
}) => {
  const { isOpen, setIsOpen } = useSidebar();

  const { id } = useNanoId();
  const pathname = usePathname();
  const routes = [
    // {
    //   label: "Home",
    //   icon: Home,
    //   href: "/dashboard",
    //   color: "text-rose-500",
    //   text: "dashboard",
    // },
    {
      label: "Projects",
      icon: Folder,
      href: "/projects",
      color: "text-yellow-500",
      text: "projects",
    },
    {
      label: "Templates",
      icon: Type,
      href: "/templates",
      color: "text-amber-500",
      text: "templates",
    },
    {
      label: "Content Creator",
      icon: Wand2,
      href: "/content-writer",
      color: "text-orange-500",
      text: "content-writer",
    },
    {
      label: "Email Writer",
      icon: Mail,
      href: "/email",
      color: "text-sky-500",
      text: "email",
    },

    {
      label: "Essay Writer",
      icon: PenLine,
      href: "/essay-writer",
      color: "text-indigo-500",
      text: "essay-writer",
    },

    {
      label: "Summarize",
      icon: Layers,
      href: "/summarize",
      color: "text-purple-600",
      text: "summarize",
    },

    {
      label: "Analyze",
      icon: BarChart2,
      href: "/analyze",
      color: "text-teal-500",
      text: "analyze",
    },

    {
      label: "Code Generation",
      icon: Code,
      color: "text-green-500",
      href: "/code",
      text: "code",
    },

    {
      label: "Image Generation",
      icon: ImageIcon,
      color: "text-pink-700",
      href: "/image-generation",
      text: "image-generation",
    },

    {
      label: "BharatGpt",
      icon: MessageSquare,
      href: `/conversation/${id}`,
      color: "text-violet-500",
      text: "conversation",
    },
   

    {
      label: "Translate",
      icon: RefreshCcw,
      href: "/translate",
      color: "text-custom-orange",
      text: "translate",
    },
    
   

    {
      label: "Pricing",
      icon: DollarSign,
      color: "text-yellow-500",
      href: "/pricing",
      text: "pricing",
    },
  ];

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-100 dark:bg-[#111827] text-white overflow-y-auto scrollbar-hide font-orbitron">
      <div className="px-3 py-2 flex-1">
        <div className="flex items-center pl-3 mb-6 gap-2">
          <Link href="/" className="">
            <Image
              className="w-20"
              height={400}
              width={500}
              alt="Logo"
              src="/BharatGPTLogo.png"
            />
          </Link>
          {/* <Link href="/dashboard">
            <p className="text-2xl font-bold text-primary">BharatChat</p>
          </Link> */}
        </div>
        <div className="space-y-1" id="tools">
          {routes.map((route, i) => (
            <Link
              key={i}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-gray-900 dark:hover:text-white  dark:hover:bg-white/10 hover:bg-black/10 rounded-lg transition",
                pathname.split("/")[1] === route.href.split("/")[1]
                  ? "dark:text-white text-gray-900 bg-black/10 dark:bg-white/10"
                  : "text-gray-600 dark:text-gray-400",
                (route.label === "Projects" || route.label === "Templates") &&
                  "mb-1 border-b-2 dark:border-gray-600"
              )}
              onClick={() => isOpen && setIsOpen(false)}
              id={i == 0 ? "projects" : ""}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter
        apiLimitCount={apiLimitCount}
        planName={planName}
        limit={limit}
      />
    </div>
  );
};
