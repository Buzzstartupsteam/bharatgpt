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
import { useRouter } from "next/navigation";
import { HistoryType } from "@prisma/client";

const formSchema = z.object({
  productName: z.string().min(4).max(100),
  productDescription: z.string().min(10).max(1500),
  audience: z.string().min(4).max(100),
  toneOfVoice: z.string().min(4),
});

const Page = () => {
  const [output, setOutput] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      audience: "",
      productDescription: "",
      toneOfVoice: "",
    },
  });

  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["product"],
    mutationFn: async ({
      audience,
      productDescription,
      productName,
      toneOfVoice,
    }: z.infer<typeof formSchema>) => {
      const prompt = `write a Google ad Description for the product named ${productName} that is targeting ${audience}. The description of the product is ${productDescription}. Write a Google AD Description keeping the tone of voice ${toneOfVoice}.
      The Google ad Description should be compelling so that the viewer is tempted to convert into sales. Remember to only write Google ad Description for the given input product. Note:- Do not write other than the Google ad Description`;

      const { data } = await axios.post("/api/lumina", { prompt });
      await axios.post("/api/history", {
        prompt: `product name : ${productName} | audience : ${audience} | tone of voice : ${toneOfVoice} | product description : ${productDescription}`,
        content: data,
        type: HistoryType.GOOGLE_AD_DESCRIPTION,
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
                    <Input placeholder="T-Shirt" {...field} />
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
              name="audience"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Target Audience</FormLabel>
                  <FormControl>
                    <Input placeholder="Young Adults, Teenagers" {...field} />
                  </FormControl>
                  <FormDescription className="text-right">
                    {form.watch("audience").length}/100
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
                  <FormLabel>Tone Of Voice</FormLabel>
                  <FormControl>
                    <Input placeholder="Witty, Persuasive" {...field} />
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
            name="productDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product/Service Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Trendy t-shirt, perfect for fashion-forward millennials. With its bold design and comfortable fit, it's a must-have for casual outings."
                    {...field}
                    className="resize-none"
                    rows={5}
                  />
                </FormControl>
                <FormDescription className="text-right">
                  {form.watch("productDescription").length}/1500
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

      <OutputBox output={output} />
    </div>
  );
};

export default Page;
