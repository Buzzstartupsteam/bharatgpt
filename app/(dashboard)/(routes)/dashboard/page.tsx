"use client";
import { ArrowRight, BarChart2, Image, Layers, Type } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { tools } from "@/constants";
import {
  Code,
  Mail,
  MessageSquare,
  PenLine,
  RefreshCcw,
  Wand2,
} from "lucide-react";
import { useNanoId } from "@/hooks/use-id";
import DashboardInfo from "@/components/dialogs/dashboard-info";
import DashboardTour from "@/components/tour/dashboard-tour";

export default function HomePage() {
  const router = useRouter();
  const { id } = useNanoId();

  const tools = [
    {
      label: "Bharat Chat",
      icon: MessageSquare,
      href: `/conversation/${id}`,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
    },
    {
      label: "Image Generation",
      icon: Image,
      href: "/image-generation",
      color: "text-pink-600",
      bgColor: "bg-pink-600/10",
    },
    {
      label: "Summarize",
      icon: Layers,
      href: "/summarize",
      color: "text-purple-600",
      bgColor: "bg-purple-600/10",
    },
    {
      label: "Analyze",
      icon: BarChart2,
      href: "/analyze",
      color: "text-teal-500",
      bgColor: "bg-teal-500/10",
    },
    {
      label: "Translate",
      icon: RefreshCcw,
      href: "/translate",
      color: "text-custom-orange",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Content Creator",
      icon: Wand2,
      href: "/content-writer",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      label: "Essay Writer",
      icon: PenLine,
      href: "/essay-writer",
      color: "text-indigo-600",
      bgColor: "bg-indigo-600/10",
    },
    {
      label: "Email Generator",
      icon: Mail,
      href: "/email",
      color: "text-sky-500",
      bgColor: "bg-sky-500/10",
    },
    {
      label: "Code Generation",
      icon: Code,
      color: "text-green-700",
      bgColor: "bg-green-700/10",
      href: "/code",
    },
    {
      label: "Templates",
      icon: Type,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      href: "/templates",
    },
  ];

  return (
    <>
      {/* <DashboardInfo /> */}
      <DashboardTour />
      <div className="pb-12 h-full">
        <div className="mb-8 space-y-4 pt-6">
          <h2 className="text-2xl md:text-4xl font-bold text-center font-orbitron">
            Your Ultimate AI Companian
          </h2>
          <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
            Unleash the potential of Generative AI with our cutting-edge content
            generation tool, empowering you to create with ease and efficiency.
          </p>
        </div>
        <div className="px-4  gap-4 grid grid-cols-1 md:grid-cols-2 max-w-screen-lg mx-auto">
          {tools.map(({ bgColor, color, href, icon: Icon, label }) => (
            <Card
              onClick={() => router.push(href)}
              key={href}
              className="p-4 flex items-center justify-between hover:shadow-md transition cursor-pointer dark:bg-gray-900 dark:border-gray-800"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", bgColor)}>
                  <Icon className={cn("w-8 h-8", color)} />
                </div>
                <div className="font-semibold font-orbitron">{label}</div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
