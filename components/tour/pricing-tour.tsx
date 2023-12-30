"use client";
import React, { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useTour } from "@/hooks/use-tour";

const PricingTour = () => {
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
            title: `Select Country`,
            description: `Please select your country from the drop-down menu to view the price
            in your currency.`,
            side: "bottom",
            align: "center",
          },
          element: "#select-country",
        },
      ],
      popoverClass: "max-w-screen-sm w-full",
      onDestroyed: () => {
        setTour({ ...tour, pricing: true });
      },
    });

    if (!tour.pricing && !tour.skip) {
      driverObj.drive();
    }
  }, []);

  return null;
};

export default PricingTour;
