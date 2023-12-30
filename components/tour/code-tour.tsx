"use client";
import React, { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useTour } from "@/hooks/use-tour";

const CodeTour = () => {
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
          element: "#code-input",
          popover: {
            title: "Code Input",
            description:
              "Please provide the logic or information of the code you would like to create.",
            side: "bottom",
          },
        },
        {
          element: `#select-language`,
          popover: {
            title: `Select Language`,
            description: `Choose the programming language from the dropdown menu in which you would like to create the code.`,
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
        setTour({ ...tour, code: true });
      },
    });

    if (!tour.code && !tour.skip) {
      driverObj.drive();
    }
  }, []);

  return null;
};

export default CodeTour;
