"use client";
import React, { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useTour } from "@/hooks/use-tour";

const EssayWriterTour = () => {
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
            title: `Topic`,
            description: `Please provide the topic for the essay you would like to create.`,
            side: "bottom",
          },
          element: "#essay-topic",
        },
        {
          element: "#essay-tone",
          popover: {
            title: `Topic`,
            description: `Pick the content's tone of voice from the options provided.`,
            side: "bottom",
          },
        },
        {
          element: "#sidebar",
          popover: {
            title: `History`,
            description: `You can access all the previous generations and generate new essay by clicking on 'Generate New'.`,
          },
        },
      ],
      popoverClass: "max-w-screen-sm w-full",
      onDestroyed: () => {
        setTour({ ...tour, essay: true });
      },
    });

    if (!tour.essay && !tour.skip) {
      driverObj.drive();
    }
  }, []);

  return null;
};

export default EssayWriterTour;
