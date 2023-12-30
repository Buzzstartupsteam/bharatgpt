"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Cookie from "js-cookie";

const stepList = [
  "Please provide the logic or information of the code you would like to create",
  "Choose the programming language from the dropdown menu in which you would like to create the code.",
  `You can access all the previous generations and generate new code by clicking on 'Generate New'.`,
];

const CodeInfo = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const codeDialog = localStorage.getItem("code") || "";
      setIsNew(codeDialog ? false : true);
    }
  }, []);

  const setDone = () => {
    setIsNew(false);
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("code", "true");
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
              "w-full max-w-[57rem] top-28 h-10 left-8": activeStep == 1,
              "h-12 w-56 left-[1.65rem] top-[12rem]": activeStep == 2,
              "w-60 h-[40rem] right-2 top-4": activeStep == 3,
            }
          )}
        ></div>

        <div
          className={cn(
            "bg-gray-100 dark:bg-gray-900 border w-full max-w-xl rounded-xl absolute  p-6 space-y-6 shadow-lg",
            {
              "top-40 left-8": activeStep === 1,
              "top-[16rem] left-6": activeStep === 2,
              "top-16 right-72": activeStep === 3,
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

export default CodeInfo;
