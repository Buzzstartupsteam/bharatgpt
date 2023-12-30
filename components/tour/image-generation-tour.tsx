"use client";
import React, { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useTour } from "@/hooks/use-tour";

const ImageGenerationTour = () => {
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
            title: `Prompt`,
            description: `Please provide a detailed prompt for the image you would like to generate.`,
            side: "bottom",
          },
          element: "#image-topic",
        },
        {
          popover: {
            title: `Suggestions`,
            description: `Try the AI prompt feature to generate a random prompt for an image.`,
            side: "bottom",
          },
          element: "#image-suggestions",
        },
        {
          popover: {
            title: `Image Type`,
            description: `You have to choose the desired image type from the drop-down menu.`,
            side: "bottom",
          },
          element: "#image-type",
        },
        {
          popover: {
            title: `Number of images`,
            description: `You have the option to choose the number of images you want in one go, with the default setting always being one.`,
            side: "bottom",
          },
          element: "#image-count",
        },
        {
          popover: {
            title: `History`,
            description: `You can access all the previous generations and generate new images by clicking on 'Generate New'.`,
          },
          element: "#sidebar",
        },
      ],
      popoverClass: "max-w-screen-sm w-full",
      onDestroyed: () => {
        setTour({ ...tour, image: true });
      },
    });

    if (!tour.image && !tour.skip) {
      driverObj.drive();
    }
  }, []);

  return null;
};

export default ImageGenerationTour;
