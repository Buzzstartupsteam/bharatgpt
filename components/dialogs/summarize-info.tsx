"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const stepList = [
  "Please provide the text you wish to summarize, ensuring that it does not exceed 20000 characters in length.",
  "Please select the desired length of the output from the dropdown menu.",
  "Please select the desired format from the dropdown menu for the output.",
  "You can access all the previous generations and summarize new content by clicking on 'Generate New'.",
];

const SummarizeInfo = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const summarize = localStorage.getItem("summarize") || "";
      setIsNew(summarize ? false : true);
    }
  }, []);

  const setDone = () => {
    setIsNew(false);
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("summarize", "true");
    }
  };

  if (!isMounted) {
    return null;
  }

  if (!isNew) {
    return null;
  }

  return (
    <div className="absolute inset-0 bg-transparent dark:bg-black/30 z-50 hidden md:block">
      <div className="absolute inset-0">
        <div
          className={cn(
            "p-4 rounded-xl border border-black dark:border-white absolute",
            {
              "w-full max-w-[59rem] top-32 h-32 left-6": activeStep == 1,
              "w-56 h-12 left-6 top-[20.25rem]": activeStep == 2,
              "w-56 h-12 left-[15.5rem] top-[20.25rem]": activeStep == 3,
              "w-60 h-[40rem] right-2 top-4": activeStep == 4,
            }
          )}
        ></div>

        <div
          className={cn(
            "bg-gray-50 dark:bg-gray-900 shadow-lg border w-full max-w-lg rounded-xl absolute  p-6 space-y-6",
            {
              "top-[17rem] left-8": activeStep === 1,
              "top-[20.5rem] left-64": activeStep === 2,
              "top-[24.5rem] left-[16rem]": activeStep === 3,
              "top-16 right-72": activeStep === 4,
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
                  activeStep == stepList.length
                    ? setDone()
                    : setActiveStep((s) => s + 1)
                }
              >
                {activeStep === stepList.length ? "Done" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarizeInfo;
