"use client";
import React, { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useTour } from "@/hooks/use-tour";

const EmailWriterTour = () => {
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
          element: "#email-type",
          popover: {
            title: "Type",
            description:
              "Please indicate whether you would like to compose an email or reply to an email.",
            side: "bottom",
          },
        },
        {
          element: "#email-topic",
          popover: {
            title: "Topic",
            description: `Please provide a brief summary of the content of your email.`,
            side: "bottom",
          },
        },
        {
          element: "#email-tone",
          popover: {
            title: "Select Tone",
            description:
              "Pick the email's tone of voice from the options provided.",
            side: "bottom",
          },
        },
        {
          element: "#sidebar",
          popover: {
            title: "History",
            description: `You can access all the previous generations and generate new email by clicking on 'Generate New'.`,
          },
        },
      ],
      popoverClass: "max-w-screen-sm w-full",
      onDestroyed: () => {
        setTour({ ...tour, email: true });
      },
    });

    if (!tour.email && !tour.skip) {
      driverObj.drive();
    }
  }, []);

  return null;
};

export default EmailWriterTour;
