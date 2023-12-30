"use client";
import React, { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useTour } from "@/hooks/use-tour";

const AnalyzeTour = () => {
  const { tour, setTour } = useTour();

  useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      onCloseClick: () => {
        driverObj.destroy();
        setTour({ ...tour, skip: true });
      },

      steps: [
        {
          element: "#analyze-input",
          popover: {
            title: "File Input",
            description:
              "You can either drag and drop the document of your choice or upload it manually by clicking on the upload button.",
            side: "bottom",
          },
        },
        {
          element: `#analyze-sidebar`,
          popover: {
            title: `Analyze History`,
            description: `You can access all the previous generations and analyze new document by clicking on "New Chat".`,
          },
        },
      ],
      popoverClass: "max-w-screen-sm w-full",
      onDestroyed: () => {
        setTour({ ...tour, analyze: true });
      },
    });

    if (!tour.analyze && !tour.skip) {
      driverObj.drive();
    }
  }, []);

  return null;
};

export default AnalyzeTour;
