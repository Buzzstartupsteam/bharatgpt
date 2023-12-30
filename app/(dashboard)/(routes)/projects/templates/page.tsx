import { cn } from "@/lib/utils";
import {
  FileText,
  LayoutGrid,
  Megaphone,
  PenLine,
  Pencil,
  Settings,
  Video,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import slugify from "slugify";

const templateCards = [
  {
    id: 1,
    title: "advertising and marketing",
    icon: Megaphone,
    text: "text-custom-orange",
    background: "bg-blue-500/10",
  },
  {
    id: 2,
    title: "blogging and social media",
    icon: FileText,
    text: "text-yellow-500",
    background: "bg-yellow-500/10",
  },
  {
    id: 3,
    title: "content creation",
    icon: PenLine,
    text: "text-teal-500",
    background: "bg-teal-500/10",
  },
  {
    id: 4,
    title: "video content",
    icon: Video,
    text: "text-rose-500",
    background: "bg-rose-500/10",
  },
  {
    id: 5,
    title: "seo and website optimization",
    icon: Settings,
    text: "text-gray-500",
    background: "bg-gray-500/10",
  },
  {
    id: 6,
    title: "all",
    icon: LayoutGrid,
    text: "text-green-500",
    background: "bg-green-500/10",
  },
];

const Page = () => {
  return (
    <div className="space-y-6">
      <Link href="/templates" className="text-xl font-semibold font-orbitron">
        Templates
      </Link>

      <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3 md:gap-6 lg:gap-8">
        {templateCards.map(({ background, icon: Icon, id, text, title }, i) => (
          <Link
            href={`/projects/templates/${slugify(title, { lower: true })}`}
            key={id}
          >
            <div
              className={cn(
                "p-4 rounded-xl flex items-center gap-4 font-medium",
                background,
                text
              )}
            >
              <Icon strokeWidth={1} className="h-20 w-20" />
              <h3 className="text-xl md:text-2xl capitalize font-semibold">
                {title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
