import { Heading } from "@/components/heading";
import { RefreshCcw } from "lucide-react";
import React from "react";
import TranslateForm from "./TranslateForm";

export const metadata = {
  title: "Translate",
};

const Translate = () => {
  return (
    <div>
      <Heading
        title="Translate"
        description="Seamlessly translate languages with our powerful generative AI-powered translation tool."
        icon={RefreshCcw}
        iconColor="text-custom-orange"
        bgColor="bg-blue-500/10"
      />
      <div className="p-4">
        <TranslateForm />
      </div>
    </div>
  );
};

export default Translate;
