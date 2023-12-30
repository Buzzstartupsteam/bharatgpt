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

const Page = async () => {
  const session = await getServerSession(authOptions);
  const templateHistory = await prismadb.history.findMany({
    where: {
      userId: session?.user.id,
      type: {
        in: [
          "FEATURE_INTO_ADVANTAGE",
          "FACEBOOK_AD_TITLE",
          "PRIMARY_TEXT_FOR_FACEBOOK_AD",
          "GOOGLE_AD_TITLE",
          "GOOGLE_AD_DESCRIPTION",
          "AMAZON_PRODUCT_FEATURES_IN_BULLETS",
          "AMAZON_PRODUCT_DESCRIPTION",
          "REVIEW_REPLY",
          "MARKETING_STRATEGIES",
        ],
      },
    },
  });
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-orbitron capitalize">
        <Link href="/templates/advertising-and-marketing">
          Advertising and marketing templatesImage{" "}
        </Link>
      </h2>

      <div className="flex flex-col divide-y">
        {templates
          .filter(({ type }) => type === "ADVERTISING AND MARKETING")
          .map(({ description, title }) => (
            <div className="py-4" key={title}>
              <div className="flex justify-between items-center mb-4">
                <Link
                  className="text-xl font-semibold"
                  href={`/templates/${slugify(title, { lower: true })}`}
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
                  ({ type }) => type == title.split(" ").join("_").toUpperCase()
                ).length === 0 ? (
                  <p className="text-muted-foreground">
                    No recent generations found!
                  </p>
                ) : (
                  templateHistory
                    .filter(
                      ({ type }) =>
                        type == title.split(" ").join("_").toUpperCase()
                    )
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
