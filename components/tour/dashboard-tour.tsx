"use client";
import React, { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useTour } from "@/hooks/use-tour";

const DashboardTour = () => {
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
          element: "#tools",
          popover: {
            title: "Tools",
            description:
              "Choose the AI Content Generation tools for your project.",
          },
        },
        {
          element: "#projects",
          popover: {
            title: "Projects",
            description: `To view all of your previous generations, please select "Projects".`,
          },
        },
        {
          element: "#upgrade-button",
          popover: {
            title: "Upgrade",
            description: `To purchase the best plan for you, click on "Upgrade."`,
          },
        },
      ],
      popoverClass: "max-w-screen-sm w-full",
      onDestroyed: () => {
        setTour({ ...tour, dashboard: true });
      },
    });

    if (!tour.dashboard && !tour.skip) {
      driverObj.drive();
    }
  }, []);

  return null;
};

export default DashboardTour;
