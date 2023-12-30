"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Cookie from "js-cookie";

const DashboardInfo = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const dashboard = localStorage.getItem("dashboard") || "";
      setIsNew(dashboard ? false : true);
    }
  }, []);

  const setDone = () => {
    setIsNew(false);
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("dashboard", "true");
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
            "p-4 rounded-xl border border-black dark:border-white absolute ",
            {
              "w-64 h-[30rem] m-2 mt-[9.5rem]": activeStep == 1,
              "w-64 h-10 m-2 mt-28": activeStep == 2,
              "top-2 right-28 w-36 h-12": activeStep == 3,
            }
          )}
        ></div>

        <div
          className={cn(
            "bg-gray-100 dark:bg-gray-900 shadow-lg border w-full max-w-lg rounded-xl absolute  p-6 space-y-6",
            {
              "top-1/2 left-80 -translate-y-1/2": activeStep === 1,
              "left-80 top-28": activeStep === 2,
              "top-20 right-28": activeStep === 3,
            }
          )}
        >
          <p>
            {activeStep === 1 &&
              "Choose the AI Content Generation tools for your project."}
            {activeStep === 2 &&
              `To view all of your previous generations, please select "Projects".`}
            {activeStep === 3 &&
              `To purchase the best plan for you, click on "Upgrade."`}
          </p>

          <div className="flex items-center justify-between">
            {/* steps */}
            <div className="flex gap-2">
              {[1, 2, 3].map((step) => (
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
              {(activeStep == 2 || activeStep == 3) && (
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
                  activeStep == 3 ? setDone() : setActiveStep((s) => s + 1)
                }
              >
                {activeStep === 3 ? "Done" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardInfo;
