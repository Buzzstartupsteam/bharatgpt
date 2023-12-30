"use client";
import { Heading } from "@/components/heading";
import { Type } from "lucide-react";
import React, { useState } from "react";
import { templates } from "@/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import slugify from "slugify";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

const tabList = [
  "ALL",
  "ADVERTISING AND MARKETING",
  "BLOGGING AND SOCIAL MEDIA",
  "CONTENT CREATION AND ENHANCEMENT",
  "VIDEO CONTENT",
  "SEO AND WEBSITE OPTIMIZATION",
];

const Templates = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("ALL");

  const advertiseTemplates = templates.filter(
    ({ type }) => type === "ADVERTISING AND MARKETING"
  );
  const bloggingTemplates = templates.filter(
    ({ type }) => type === "BLOGGING AND SOCIAL MEDIA"
  );
  const contentCreationTemplates = templates.filter(
    ({ type }) => type === "CONTENT CREATION AND ENHANCEMENT"
  );
  const videoTemplates = templates.filter(
    ({ type }) => type === "VIDEO CONTENT"
  );
  const seoTemplates = templates.filter(
    ({ type }) => type === "SEO AND WEBSITE OPTIMIZATION"
  );

  return (
    <div>
      <Heading
        title="Templates"
        description="Discover the Power of BharatChat: Effortlessly Reduce Your Workload with Our Cutting-Edge Templates. Browse through an Array of Templates to Create Engaging Content Today!"
        icon={Type}
        bgColor="bg-amber-500/10"
        iconColor="text-amber-500"
      />

      <div className="px-4 md:px-8 pb-6 space-y-4 relative">
        {/* tabs */}
        <div className="flex w-full overflow-x-auto gap-2 tabs pb-1">
          {tabList.map((tab) => (
            <Button
              key={tab}
              variant={tab == activeTab ? "default" : "ghost"}
              onClick={() => setActiveTab(tab)}
              size="sm"
              className={cn(
                "whitespace-nowrap text-xs",
                inter.className,
                tab == activeTab && "text-sm"
              )}
            >
              {tab}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTab === "ALL" &&
            templates.map(({ description, title, type }) => (
              <Link
                className="flex flex-1"
                href={`/templates/${slugify(title).toLowerCase()}`}
                key={title}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          {activeTab === "ADVERTISING AND MARKETING" &&
            advertiseTemplates.map(({ description, title, type }) => (
              <Link
                className="flex flex-1"
                href={`/templates/${slugify(title).toLowerCase()}`}
                key={title}
              >
                <Card className="cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-xl">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          {activeTab === "BLOGGING AND SOCIAL MEDIA" &&
            bloggingTemplates.map(({ description, title, type }) => (
              <Link
                href={`/templates/${slugify(title).toLowerCase()}`}
                key={title}
                className="flex flex-1"
              >
                <Card className="cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-xl">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          {activeTab === "CONTENT CREATION AND ENHANCEMENT" &&
            contentCreationTemplates.map(({ description, title, type }) => (
              <Link
                href={`/templates/${slugify(title).toLowerCase()}`}
                key={title}
                className="flex flex-1"
              >
                <Card className="cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-xl">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          {activeTab === "VIDEO CONTENT" &&
            videoTemplates.map(({ description, title, type }) => (
              <Link
                href={`/templates/${slugify(title).toLowerCase()}`}
                key={title}
                className="flex flex-1"
              >
                <Card className="cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-xl">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          {activeTab === "SEO AND WEBSITE OPTIMIZATION" &&
            seoTemplates.map(({ description, title, type }) => (
              <Link
                href={`/templates/${slugify(title).toLowerCase()}`}
                key={title}
                className="flex flex-1"
              >
                <Card className="cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-xl">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
