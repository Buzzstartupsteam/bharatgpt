"use client";
import React, { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useTour } from "@/hooks/use-tour";

const SummarizeTour = () => {
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
          popover: {
            title: `Text to summarize`,
            description: `Please provide the text you wish to summarize, ensuring that it does not exceed 20000 characters in length.`,
            side: "bottom",
          },
          element: "#summarize-input",
        },
        {
          popover: {
            title: `Select Length`,
            description: `Please select the desired length of the output from the dropdown menu.`,
            side: "bottom",
          },
          element: "#summarize-length",
        },
        {
          popover: {
            title: `Select Format`,
            description: `Please select the desired format from the dropdown menu for the output.`,
            side: "bottom",
          },
          element: "#summarize-format",
        },
        {
          popover: {
            title: `History`,
            description: `You can access all the previous generations and summarize new content by clicking on 'Generate New'.`,
          },
          element: "#sidebar",
        },
      ],
      popoverClass: "max-w-screen-sm w-full",
      onDestroyed: () => {
        setTour({ ...tour, summarize: true });
      },
    });

    if (!tour.summarize && !tour.skip) {
      driverObj.drive();
    }
  }, []);

  return null;
};

export default SummarizeTour;
