"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useIsFirstLogin } from "@/hooks/useIsFirstLogin";
import Cookie from "js-cookie";

const stepList = [
  "Please provide a detailed prompt for the image you would like to generate.",
  "Try the AI prompt feature to generate a random prompt for an image.",
  "You have to choose the desired image type from the drop-down menu.",
  "You have the option to choose the number of images you want in one go, with the default setting always being one.",
  `You can access all the previous generations and generate new images by clicking on 'Generate New'.`,
];

const ImageInfo = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const image = localStorage.getItem("image") || "";
      setIsNew(image ? false : true);
    }
  }, []);

  const setDone = () => {
    setIsNew(false);
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("image", "true");
    }
  };

  if (!isMounted) {
    return null;
  }

  if (!isNew) {
    return null;
  }

  return (
    <div className="absolute inset-0 bg-transparent dark:bg-black/40 z-50 hidden md:block">
      <div className="absolute inset-0">
        <div
          className={cn(
            "p-4 rounded-xl border border-black dark:border-white absolute",
            {
              "w-full max-w-[43rem] top-28 h-10 left-16": activeStep == 1,
              "h-12 w-12 top-[6.75rem] right-[27.35rem]": activeStep == 2,
              "w-56 h-12 left-[3.5rem] top-48": activeStep == 3,
              "w-56 h-12 left-[18rem] top-48": activeStep == 4,
              "w-60 h-[40rem] right-2 top-4": activeStep == 5,
            }
          )}
        ></div>

        <div
          className={cn(
            "bg-gray-50 dark:bg-gray-900 shadow-lg border w-full max-w-lg rounded-xl absolute  p-6 space-y-6",
            {
              "top-40 left-16": activeStep === 1,
              "top-40 left-64": activeStep === 2,
              "top-64 left-16": activeStep === 3,
              "top-64 left-72": activeStep === 4,
              "top-16 right-72": activeStep === 5,
            }
          )}
        >
          <p>{stepList.map((text, i) => activeStep === i + 1 && text)}</p>

          <div className="flex items-center justify-between">
            {/* steps */}
            <div className="flex gap-2">
              {stepList.map((step, i) => (
                <Button
                  key={step}
                  className={cn(
                    "rounded-full",
                    activeStep === i + 1 && "bg-green-500"
                  )}
                  size="icon"
                  variant="secondary"
                >
                  {i + 1}
                </Button>
              ))}
            </div>

            <div className="space-x-4">
              {[2, 3, 4, 5].includes(activeStep) && (
                <Button
                  className="text-right ml-auto"
                  variant="secondary"
                  onClick={() => setActiveStep((s) => s - 1)}
                >
                  Previous
                </Button>
              )}
              <Button
                className="text-right ml-auto"
                variant="secondary"
                onClick={() =>
                  activeStep == 5 ? setDone() : setActiveStep((s) => s + 1)
                }
              >
                {activeStep === 5 ? "Done" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageInfo;
