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
  audience: z.string().min(4).max(100),
  toneOfVoice: z.string().min(4),
  competitiveDiff: z.string().min(10).max(1500),
});

const Page = () => {
  const [output, setOutput] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      audience: "",
      competitiveDiff: "",
      toneOfVoice: "",
    },
  });

  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      audience,
      competitiveDiff,
      productName,
      toneOfVoice,
    }: z.infer<typeof formSchema>) => {
      const { data } = await axios.post("/api/lumina", {
        prompt: `There is a product named ${productName} which is targeting ${audience} the description of the product is ${competitiveDiff}. Write the advantages of the product to convert swift sales keeping the tone of voice ${toneOfVoice}.`,
      });

      await axios.post("/api/history", {
        prompt: `product name : ${productName} | `,
        content: data,
        type: HistoryType.FEATURE_INTO_ADVANTAGE,
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
                  <FormLabel>Product Name</FormLabel>
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
            name="competitiveDiff"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Trendy t-shirt, perfect for fashion-forward millennials. With its bold design and comfortable fit, it's a must-have for casual outings."
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormDescription className="text-right">
                  {form.watch("competitiveDiff").length}/1500
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
