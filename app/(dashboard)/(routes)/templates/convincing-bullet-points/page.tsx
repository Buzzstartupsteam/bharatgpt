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
import CopyToClipboard from "@/components/copy-to-clipboard";
import { useRouter } from "next/navigation";
import { HistoryType } from "@prisma/client";
import MultipleOutput from "@/components/mutliple-output";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetcher } from "@/lib/utils";

const formSchema = z.object({
  productName: z.string().min(4).max(100),
  productDescription: z.string().min(10).max(1500),
  audience: z.string().min(4).max(100),
  toneOfVoice: z.string().min(4),
  numberOfGeneration: z.number(),
});

const Page = () => {
  const [output, setOutput] = useState<string[] | []>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      audience: "",
      productDescription: "",
      toneOfVoice: "",
      numberOfGeneration: 3,
    },
  });

  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      audience,
      productDescription,
      productName,
      toneOfVoice,
      numberOfGeneration,
    }: z.infer<typeof formSchema>) => {
      const prompt = `write convincing bullet points for ${productName} who is targeting ${audience}, the description of the product is ${productDescription}. Write Bullets for the description with tone of voice ${toneOfVoice}. The bullet points should be compelling so that the viewer does a conversion quickly. Remember to only write bullets to the given product. Note:- Do not write other than bullets.`;

      const dataArray = await Promise.all(
        Array(numberOfGeneration)
          .fill("")
          .map((_, i) => fetcher(prompt))
      );

      await axios.post("/api/history", {
        prompt: `product name : ${productName} | audience : ${audience} | tone of voice : ${toneOfVoice} | product description : ${productDescription}`,
        content: dataArray.join("|"),
        type: HistoryType.CONVINCING_BULLET_POINTS,
      });

      return dataArray;
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
          <div className="">
            <div className="flex flex-col md:flex-row gap-4">
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
                    <FormLabel>Tone of voice or brand style</FormLabel>
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
          </div>
          <FormField
            control={form.control}
            name="numberOfGeneration"
            render={({ field }) => (
              <FormItem className="space-y-1 mb-4">
                <FormLabel>Number Of Generations</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="bg-transparent text-gray-800 dark:text-white w-52 capitalize">
                      <SelectValue className="capitalize" placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[15rem] overflow-y-auto">
                    {[1, 2, 3].map((num) => (
                      <SelectItem
                        className="capitalize"
                        key={num}
                        value={num.toString()}
                      >
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Please provide information about your product
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Trendy t-shirt, perfect for fashion-forward millennials. With its bold design and comfortable fit, it's a must-have for casual outings"
                    className="resize-none"
                    {...field}
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

      <MultipleOutput outputs={output} />
    </div>
  );
};

export default Page;
