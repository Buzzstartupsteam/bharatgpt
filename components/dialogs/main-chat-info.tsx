"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const BharatChatInfo = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const bharatDialog = localStorage.getItem("bharat-chat") || "";
      setIsNew(bharatDialog ? false : true);
    }
  }, []);

  const setDone = () => {
    setIsNew(false);
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("bharat-chat", "true");
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
        {
          <div
            className={cn(
              "p-4 rounded-xl border border-black dark:border-white absolute",
              {
                "w-full max-w-[55rem] bottom-4 h-16 ml-[19.5rem]":
                  activeStep == 1,
                "w-60 h-[40rem] right-2 top-[4.65rem]": activeStep == 2,
              }
            )}
          ></div>
        }

        <div
          className={cn(
            "bg-gray-100 dark:bg-gray-900 shadow-lg border w-full max-w-lg rounded-xl absolute  p-6 space-y-6",
            {
              "bottom-24 left-1/2 -translate-x-1/2": activeStep === 1,
              "top-16 right-72": activeStep === 2,
            }
          )}
        >
          <p>
            {activeStep === 1 &&
              "To initiate a conversation with Bharat chat, simply type a message here."}
            {activeStep === 2 &&
              `You can access all the previous conversations with Bharat Chat here. To start a new conversation, simply click on "Generate New".`}
          </p>

          <div className="flex items-center justify-between">
            {/* steps */}
            <div className="flex gap-2">
              {[1, 2].map((step) => (
                <Button
                  key={step}
                  className={cn(
                    "rounded-full",
                    activeStep === step && "bg-green-500"
                  )}
                  size="icon"
                  variant="secondary"
                >
                  {step}
                </Button>
              ))}
            </div>

            <div className="space-x-4">
              {activeStep == 2 && (
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
                  activeStep == 2 ? setDone() : setActiveStep((s) => s + 1)
                }
              >
                {activeStep === 2 ? "Done" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BharatChatInfo;
