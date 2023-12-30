"use client";
import { DotWave } from "@uiball/loaders";
import React from "react";

const Loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <DotWave size={47} speed={1} color="rgb(14 165 233)" />
    </div>
  );
};

export default Loading;
