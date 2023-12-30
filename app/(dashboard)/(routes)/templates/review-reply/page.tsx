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
import { Slider } from "@/components/ui/slider";
import OutputBox from "@/components/output-box";
import { HistoryType } from "@prisma/client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  productName: z.string().min(4).max(100),
  reviewerName: z.string().min(4).max(100),
  rating: z.number().min(1).max(5),
  toneOfVoice: z.string().min(4).max(100),
  customerReview: z.string().min(10).max(1500),
});

const Page = () => {
  const [output, setOutput] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      reviewerName: "",
      toneOfVoice: "",
      customerReview: "",
      rating: 1,
    },
  });

  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["product"],
    mutationFn: async ({
      customerReview,
      productName,
      rating,
      reviewerName,
      toneOfVoice,
    }: z.infer<typeof formSchema>) => {
      const { data } = await axios.post("/api/lumina", {
        prompt: `Write a customer review response for the review for the product ${productName}, the name of the reviewer is  ${reviewerName}, who gave a  ${rating} star rating. the customer wrote the following:- "${customerReview}"
      Write a review response keeping the tone of voice ${toneOfVoice}. remember to only write responses to the given review.`,
      });
      await axios.post("/api/history", {
        prompt: `product name : ${productName} | reviewer name : ${reviewerName} | rating : ${rating} | tone of voice : ${toneOfVoice} | customer review : ${customerReview} `,
        content: data,
        type: HistoryType.REVIEW_REPLY,
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
    console.log(values);
    mutate(values);
  }
  return (
    <div className="flex-1 py-6 px-4 lg:px-8 space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between mb-4">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Product/Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
                  </FormControl>
                  <FormDescription className="text-right">
                    {form.watch("productName").length}/100
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reviewerName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Reviewer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription className="text-right">
                    {form.watch("reviewerName").length}/100
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Star Rating (from 1-5)</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="" {...field} /> */}
                    <Slider
                      value={[field.value]}
                      className="py-4"
                      onValueChange={(value) => field.onChange(value[0])}
                      max={5}
                      min={1}
                      step={1}
                    />
                  </FormControl>

                  <FormDescription className="text-right">
                    {field.value}
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="toneOfVoice"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tone of voice</FormLabel>
                  <FormControl>
                    <Input placeholder="Appreciative" {...field} />
                  </FormControl>
                  <FormDescription className="text-right">
                    {form.watch("toneOfVoice").length}/100
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="customerReview"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Review</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Review written by customer"
                    {...field}
                    rows={5}
                    className="resize-none"
                  />
                </FormControl>
                <FormDescription className="text-right">
                  {form.watch("customerReview").length}/1500
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
