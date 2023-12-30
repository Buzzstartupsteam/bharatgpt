"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useIsFirstLogin } from "@/hooks/useIsFirstLogin";

const stepList = [
  "You can either drag and drop the document of your choice or upload it manually by clicking on the upload button.",
  "You can access all the previous generations and generate new images by clicking on 'Generate New'.",
];

const AnalyzeInfo = () => {
  const { isFirstLogin, setIsFirstLogin } = useIsFirstLogin();
  const pathname = usePathname();
  const [activeStep, setActiveStep] = useState(1);
  const router = useRouter();

  const setDone = () => {
    router.replace(pathname);
  };

  return (
    <div className="absolute inset-0 bg-black/40 z-50">
      <div className="absolute inset-0">
        <div
          className={cn("p-4 rounded-xl border border-white absolute", {
            "w-full max-w-[33rem] top-[6rem] h-56 left-6": activeStep == 1,
            "w-60 h-[40rem] right-2 top-4": activeStep == 2,
          })}
        ></div>

        <div
          className={cn(
            "bg-gray-900 border w-full max-w-lg rounded-xl absolute  p-6 space-y-6",
            {
              "top-[20rem] left-8": activeStep === 1,
              "top-16 right-72": activeStep === 2,
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
                    ? setDone
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

export default AnalyzeInfo;
