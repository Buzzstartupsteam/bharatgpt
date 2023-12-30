"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const PridingInfo = () => {
  const [isMounted, setIsMounted] = useState(false);

  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const pricing = localStorage.getItem("pricing") || "";
      setIsNew(pricing ? false : true);
    }
  }, []);

  const setDone = () => {
    setIsNew(false);
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("pricing", "true");
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
            "p-4 rounded-xl border border-black dark:border-white absolute top-[17.45rem] right-[29.5rem] w-72 h-12"
          )}
        ></div>

        <div
          className={cn(
            "bg-gray-50 dark:bg-gray-900 shadow-lg border w-full max-w-lg rounded-xl absolute  p-6 space-y-6 top-[22rem] right-[23rem]"
          )}
        >
          <p>
            Please select your country from the drop-down menu to view the price
            in your currency.
          </p>

          <div className="flex justify-end">
            <Button variant="secondary" onClick={setDone}>
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PridingInfo;
