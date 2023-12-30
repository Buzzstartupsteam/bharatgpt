import { cn } from "@/lib/utils";
import React, { FC } from "react";
import { planDetails } from "../constants";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface GenerationsTopUpProps {
  country: string;
}

const GenerationsTopUp: FC<GenerationsTopUpProps> = ({ country }) => {
  const { mutate, isLoading } = useMutation({
    mutationKey: ["generations topup"],
    mutationFn: async ({
      currency,
      price,
    }: {
      currency: string;
      price: number;
    }) => {
      const { data } = await axios.post("/api/topup", {
        currency,
        price,
      });
      return data;
    },
    onSuccess(data, variables, context) {
      window.location.href = data.url;
    },
    onError(error, variables, context) {
      toast.error("Sorry something went wrong:(");
    },
  });

  return (
    <section
      className={cn("py-20 bg-gradient-to-tr from-sky-500/20 to-sky-500/5")}
    >
      <div className="p-6 text-center">
        <p className="text-sm uppercase tracking-[0.35em] font-orbitron mb-4">
          Add Ons
        </p>
        <p className="text-3xl font-bold font-orbitron">
          {planDetails[country].symbol} {planDetails[country].topUp.price}
        </p>

        <ul className="flex flex-col gap-4 py-8 mt-[4rem] mb-[5.90rem]">
          <li className=" ml-4">Add 100 generations</li>
        </ul>

        <Button
          className="rounded-none"
          variant="outline"
          onClick={() =>
            mutate({
              currency: planDetails[country].currency,
              price: planDetails[country].topUp.price,
            })
          }
          disabled={isLoading}
        >
          {isLoading && <Loader2 size={20} className="animate-spin mr-2" />}
          Buy Generations
        </Button>
      </div>
    </section>
  );
};

export default GenerationsTopUp;
