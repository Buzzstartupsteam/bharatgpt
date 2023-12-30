"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useIsFirstLogin } from "@/hooks/useIsFirstLogin";
import Cookie from "js-cookie";

const stepList = [
  "Please indicate whether you would like to compose an email or reply to an email.",
  "Please provide a brief summary of the content of your email.",
  "Pick the email's tone of voice from the options provided.",
  `You can access all the previous generations and generate new email by clicking on 'Generate New'.`,
];

const EmailInfo = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const email = localStorage.getItem("email") || "";
      setIsNew(email ? false : true);
    }
  }, []);

  const setDone = () => {
    setIsNew(false);
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("email", "true");
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
              "w-56 top-[7.5rem] h-12 left-6": activeStep == 1,
              "h-12 w-full max-w-[33.5rem] left-[1.65rem] top-[13rem]":
                activeStep == 2,
              "h-12 w-56 left-[1.65rem] top-[18.15rem]": activeStep == 3,
              "w-60 h-[40rem] right-2 top-4": activeStep == 4,
            }
          )}
        ></div>

        <div
          className={cn(
            "bg-gray-100 dark:bg-gray-900 border w-full max-w-xl rounded-xl absolute  p-6 space-y-6 shadow-lg",
            {
              "top-44 left-8": activeStep === 1,
              "top-[17rem] left-6": activeStep === 2,
              "top-[22rem] left-6": activeStep === 3,
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
              {[2, 3, 4].includes(activeStep) && (
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

export default EmailInfo;
