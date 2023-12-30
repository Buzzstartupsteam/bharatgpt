"use client";
import React, { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useTour } from "@/hooks/use-tour";

const BharatChatTour = () => {
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
          element: "#bharat-chat-input",
          popover: {
            title: "Chat Input",
            description:
              "To initiate a conversation with Bharat chat, simply type a message here.",
            side: "top",
          },
        },
        {
          element: `#bharat-chat-sidebar`,
          popover: {
            title: `Chat History`,
            description: `You can access all the previous conversations with Bharat Chat here. To start a new conversation, simply click on "Generate New".`,
          },
        },
      ],
      popoverClass: "max-w-screen-sm w-full",
      onDestroyed: () => {
        setTour({ ...tour, bharatChat: true });
        driverObj.destroy();
      },
    });

    if (!tour.bharatChat && !tour.skip) {
      driverObj.drive();
    }
  }, []);

  useEffect(() => {
    console.log(tour);
  }, [tour]);

  return null;
};

export default BharatChatTour;
