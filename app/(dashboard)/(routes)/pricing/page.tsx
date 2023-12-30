import { Heading } from "@/components/heading";
import { DollarSign } from "lucide-react";
import React from "react";
import Pricing from "./components/Pricing";
import PridingInfo from "@/components/dialogs/pricing-info";
import PricingTour from "@/components/tour/pricing-tour";

export const metadata = {
  title: "Pricing",
};

const PricingPage = () => {
  return (
    <>
      {/* <PridingInfo /> */}
      <PricingTour />
      <div className="">
        <Heading
          icon={DollarSign}
          title="Pricing"
          description=""
          bgColor="bg-yellow-500/10"
          iconColor="text-yellow-500"
        />

        <div className="p-4 lg:px-8 md:py-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl dark:text-gray-200 text-gray-700 font-orbitron font-bold">
              Affordable Pricing Options
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              AI-generated content creation made affordable with our dynamic
              pricing options.
            </p>
          </div>
          <Pricing />
        </div>
      </div>
    </>
  );
};

export default PricingPage;
