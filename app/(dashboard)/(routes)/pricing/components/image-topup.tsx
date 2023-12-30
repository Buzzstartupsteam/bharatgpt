"use client";
import { cn } from "@/lib/utils";
import React, { FC } from "react";
import { planDetails } from "../constants";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface ImageTopupProps {
  country: string;
}

const ImageTopup: FC<ImageTopupProps> = ({ country }) => {
  const { mutate, isLoading } = useMutation({
    mutationKey: ["image topup"],
    mutationFn: async ({
      currency,
      price,
    }: {
      currency: string;
      price: number;
    }) => {
      const { data } = await axios.post("/api/topup/image-generation", {
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
          Image Generations
        </p>
        <p className="text-3xl font-bold font-orbitron">
          {planDetails[country].symbol}{" "}
          {planDetails[country].imageGeneration.price}
        </p>

        <ul className="flex flex-col gap-4 py-8 mt-[4rem] mb-[5.90rem]">
          <li className=" ml-4">Add 200 image generations</li>
        </ul>

        <Button
          className="rounded-none"
          variant="outline"
          disabled={isLoading}
          onClick={() =>
            mutate({
              currency: planDetails[country].currency,
              price: planDetails[country].imageGeneration.price,
            })
          }
        >
          {isLoading && <Loader2 size={20} className="animate-spin mr-2" />}
          Buy Image Generations
        </Button>
      </div>
    </section>
  );
};

export default ImageTopup;
