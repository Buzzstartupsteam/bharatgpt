"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const BreadCrumbs = () => {
  const pathname = usePathname();

  const paths = pathname.split("/");
  paths.shift();

  console.log(paths);

  return (
    <div className="flex items-center mb-4 text-sm md:text-base">
      <Link href="/dashboard">
        <Home className="h-4 w-4 text-muted-foreground" />
      </Link>
      <ChevronRight size={20} />
      <Link
        className={cn(
          "hover:underline text-muted-foreground",
          pathname === "/projects" && "text-primary font-medium"
        )}
        href="/projects"
      >
        Projects
      </Link>
      {paths.length >= 2 && (
        <>
          <ChevronRight size={20} />
          <Link
            className={cn(
              "hover:underline text-muted-foreground capitalize",
              pathname === `/${paths[0]}/${paths[1]}` &&
                "text-primary font-medium"
            )}
            href={`/projects/${paths[1]}`}
          >
            {paths[1].split("-").join(" ")}
          </Link>
        </>
      )}
      {paths.length >= 3 && (
        <>
          <ChevronRight size={20} />
          <Link
            className={cn("hover:underline font-medium capitalize")}
            href={pathname}
          >
            {paths[2].split("-").join(" ")}
          </Link>
        </>
      )}
    </div>
  );
};

export default BreadCrumbs;
