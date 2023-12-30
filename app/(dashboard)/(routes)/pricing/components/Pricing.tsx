"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
} from "@/components/ui/select";
import { countries } from "../constants";
import { Label } from "@/components/ui/label";
import { planDetails } from "../constants";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useCountryName } from "@/hooks/useCountryName";
import PricingCard from "./PricingCard";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { Plan } from "@prisma/client";
import ImageTopup from "./image-topup";
import GenerationsTopUp from "./generations-topup";

function capitalizeString(str: string) {
  // Split the string into words
  const words = str.split(" ");

  // Capitalize the first letter of each word and make the rest lowercase
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join the words back together with spaces
  return capitalizedWords.join(" ");
}

const Pricing = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("India");
  const [isMonthly, setIsMothly] = useState(true);
  const [country, setCountry] = useState("India");

  const [loading, setLoading] = useState(false);

  const onSubscribe = async (currency: string, price: number) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/topup", { currency, price });

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const onImageAddOn = async (currency: string, price: number) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/topup/image-generation", {
        currency,
        price,
      });

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center flex-col my-6" id="select-country">
        <Label className="mb-2">Select Your Country</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[280px] justify-between"
            >
              {country ? country : "Select Country..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-0">
            <Command>
              <CommandInput placeholder="Search Country..." />
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                <ScrollArea className="h-60">
                  <ScrollBar />

                  {countries.map((countryName) => (
                    <CommandItem
                      key={countryName}
                      onSelect={(currentValue) => {
                        setCountry(capitalizeString(currentValue));
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          country === countryName ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {countryName}
                    </CommandItem>
                  ))}
                </ScrollArea>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid gap-4 md:grid-cols-3 md:gap-6">
        {/* section 1 */}
        {planDetails[country].plans.map(
          ({ enum: PlanEnum, generations, name, price }) => (
            <PricingCard
              key={name}
              country={country}
              generations={generations}
              name={name}
              price={price}
              isMonthly={isMonthly}
              planEnum={PlanEnum as Plan}
            />
          )
        )}

        <ImageTopup country={country} />
        <GenerationsTopUp country={country} />
      </div>
    </div>
  );
};

export default Pricing;
