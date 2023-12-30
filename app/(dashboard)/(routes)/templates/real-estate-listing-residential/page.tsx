"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import OutputBox from "@/components/output-box";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HistoryType } from "@prisma/client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  propertyDetails: z.string().min(4).max(100),
  propertyTitle: z.string().min(4).max(100),
  propertySize: z.string().min(4),
  propertyDescription: z.string().min(10).max(1500),
  sellOrRent: z.enum(["sell", "rent"]),
});

const Page = () => {
  const [output, setOutput] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyDetails: "",
      propertyTitle: "",
      propertyDescription: "",
      propertySize: "",
      sellOrRent: "sell",
    },
  });

  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["real estate"],
    mutationFn: async ({
      propertyTitle,
      propertyDescription,
      propertyDetails,
      propertySize,
      sellOrRent,
    }: z.infer<typeof formSchema>) => {
      const { data } = await axios.post("/api/lumina", {
        prompt: `Write a real estate listing for the ${propertyDetails}, I want to put for ${sellOrRent} the title of the listing should mean ${propertyTitle}, and the size of my property is ${propertySize}. The description for my property is ${propertyDescription}.
        Remember to only write the listing description for the given property. Make it fit to the residential listing standards and result in a quick sale.`,
      });
      await axios.post("/api/history", {
        prompt: `property title : ${propertyTitle} | property size : ${propertySize} | property details : ${propertyDetails} | sell/rent : ${sellOrRent} | property description : ${propertyDescription}`,
        content: data,
        type: HistoryType.REAL_ESTATE_LISTING_RESIDENTIAL,
      });

      return data;
    },
    onSuccess(data, variables, context) {
      setOutput(data);
      router.refresh();
    },
    onError(error: any, variables, context) {
      toast.error(error.message);
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }
  return (
    <div className="flex-1 py-6 px-4 lg:px-8 space-y-6 scrollbar-hide overflow-y-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between mb-4">
            <FormField
              control={form.control}
              name="propertyDetails"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Property Details</FormLabel>
                  <FormControl>
                    <Input placeholder="house, apartment" {...field} />
                  </FormControl>
                  <FormDescription className="text-right">
                    {form.watch("propertyDetails").length}/100
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="propertyTitle"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Property Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="creating a compelling and descriptive property "
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-right">
                    {form.watch("propertyTitle").length}/100
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="propertySize"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Property Size and Dimensions</FormLabel>
                  <FormControl>
                    <Input placeholder="Plot size in sqft" {...field} />
                  </FormControl>
                  <FormDescription className="text-right">
                    {form.watch("propertySize").length}/100
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sellOrRent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sell/Rent</FormLabel>
                  <Select
                    onValueChange={(value: "sell" | "rent") =>
                      field.onChange(value)
                    }
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-transparent text-gray-800 dark:text-white w-52">
                        <SelectValue placeholder="Select a Language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[15rem] overflow-y-auto">
                      <SelectItem value="sell">Sell</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="propertyDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A larger text input field for providing a detailed description of the property, including features, amenities, number of bedrooms, bathrooms and selling points."
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormDescription className="text-right">
                  {form.watch("propertyDescription").length}/1500
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 size={20} className="mr-2 animate-spin" />}
            Generate
          </Button>
        </form>
      </Form>

      {output && <OutputBox output={output} />}
    </div>
  );
};

export default Page;
