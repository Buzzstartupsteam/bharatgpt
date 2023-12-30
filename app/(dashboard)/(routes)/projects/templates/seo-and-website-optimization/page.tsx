import React from "react";
import { templates } from "@/constants";
import Link from "next/link";
import slugify from "slugify";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function toConstantCase(input: string): string {
  return input.toUpperCase().replace(/-/g, "_");
}

function convertToSnakeCase(inputString: string) {
  // Remove special characters and convert spaces and hyphens to underscores
  const cleanedString = inputString
    .replace(/[^\w\s-]/g, "")
    .replace(/[-\s]+/g, "_");

  // Convert to uppercase and remove leading/trailing underscores
  const snakeCaseString = cleanedString.toUpperCase().replace(/^_+|_+$/g, "");

  return snakeCaseString;
}

const Page = async () => {
  const session = await getServerSession(authOptions);
  const templateHistory = await prismadb.history.findMany({
    where: {
      userId: session?.user.id,
      type: {
        in: [
          "SEO_TITLE_AND_META_DESCRIPTIONS",
          "SEO_BLOG_POSTS_TITLE_AND_META_DESCRIPTIONS",
          "SEO_HOMEPAGE_TITLE_AND_META_DESCRIPTIONS",
          "SEO_PRODUCT_PAGE_TITLE_AND_META_DESCRIPTIONS",
          "SEO_SERVICES_PAGES_TITLE_AND_META_DESCRIPTIONS",
          "REAL_ESTATE_LISTING_RESIDENTIAL",
          "USP",
        ],
      },
    },
  });
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-orbitron capitalize">
        Seo And Website Optimization Templates
      </h2>

      <div className="flex flex-col divide-y">
        {templates
          .filter(({ type }) => type === "SEO AND WEBSITE OPTIMIZATION")
          .map(({ description, title }) => (
            <div className="py-4" key={title}>
              <div className="flex justify-between items-center mb-4">
                <Link
                  href={`/templates/${slugify(title, { lower: true })}`}
                  className="text-xl font-semibold"
                >
                  {title}
                </Link>
                <Link href={`/templates/${slugify(title, { lower: true })}`}>
                  <Button variant="ghost" size="sm">
                    More
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-3 lg:gap-8">
                {templateHistory.filter(
                  ({ type }) => type == convertToSnakeCase(title)
                ).length === 0 ? (
                  <p className="text-muted-foreground">
                    No recent generations found!
                  </p>
                ) : (
                  templateHistory
                    .filter(({ type }) => type == convertToSnakeCase(title))
                    .slice(0, 3)
                    .map(({ createdAt, type, id, prompt, content }) => (
                      <Link
                        className="flex flex-1"
                        href={`/templates/${type
                          .split("_")
                          .join("-")
                          .toLowerCase()}/${id}`}
                        key={id}
                      >
                        <div className="p-4 border rounded-xl space-y-4">
                          <div className="capitalize line-clamp-2">
                            {prompt}
                          </div>
                          <ScrollArea className="h-72">
                            <ScrollBar />

                            {content.split("|").map((item, i) => (
                              <ReactMarkdown
                                key={i}
                                className="prose dark:prose-invert"
                              >
                                {item}
                              </ReactMarkdown>
                            ))}
                          </ScrollArea>
                          <p className="text-muted-foreground text-right text-sm">
                            {formatDate(createdAt)}
                          </p>
                        </div>
                      </Link>
                    ))
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
