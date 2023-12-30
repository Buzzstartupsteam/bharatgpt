"use client";
import React, { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useTour } from "@/hooks/use-tour";

const ContentCreatorTour = () => {
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
          element: "#cc-topic",
          popover: {
            title: "Topic",
            description:
              "Please provide the topic for the content you would like me to create.",
            side: "bottom",
          },
        },
        {
          element: "#cc-mood",
          popover: {
            title: "Select Mood",
            description:
              "Please choose the mood from the dropdown menu for the content.",
            side: "bottom",
          },
        },
        {
          element: "#cc-personality",
          popover: {
            title: "Select Personality",
            description:
              "Please choose the personality from the dropdown menu for the content.",
            side: "bottom",
          },
        },
        {
          element: "#cc-sentiment",
          popover: {
            title: "Select Sentiment",
            description:
              "Choose the content's sentiment from the dropdown menu.",
            side: "bottom",
          },
        },
        {
          element: "#cc-tone",
          popover: {
            title: "Select Tone",
            description:
              "Pick the content's tone of voice from the options provided.",
            side: "bottom",
          },
        },
        {
          element: `#sidebar`,
          popover: {
            title: `History`,
            description: `You can access all the previous generations and generate new code by clicking on 'Generate New'.`,
          },
        },
      ],
      popoverClass: "max-w-screen-sm w-full",
      onDestroyed: () => {
        setTour({ ...tour, contentCreator: true });
      },
    });

    if (!tour.contentCreator && !tour.skip) {
      driverObj.drive();
    }
  }, []);

  return null;
};

export default ContentCreatorTour;
