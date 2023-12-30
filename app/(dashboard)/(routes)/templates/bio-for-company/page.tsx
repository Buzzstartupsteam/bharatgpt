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
import OutputBox from "@/components/output-box";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";
import MultipleOutput from "@/components/mutliple-output";
import { HistoryType } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetcher } from "@/lib/utils";

const formSchema = z.object({
  companyName: z.string().min(4).max(100),
  companyDetails: z.string().min(10).max(1500),
  companyFeatures: z.string().min(4).max(100),
  toneOfVoice: z.string().min(4),
  numberOfWords: z.number().min(2).max(1500),
  numberOfGeneration: z.number(),
});

const Page = () => {
  const [output, setOutput] = useState<string[] | []>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      companyFeatures: "",
      companyDetails: "",
      toneOfVoice: "",
      numberOfWords: 50,
      numberOfGeneration: 3,
    },
  });

  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      companyFeatures,
      companyDetails,
      companyName,
      toneOfVoice,
      numberOfWords,
      numberOfGeneration,
    }: z.infer<typeof formSchema>) => {
      const prompt = `Write a Company bio for the company named ${companyName}. their Company info is ${companyDetails}, this comapny is into ${companyFeatures}. write a ${numberOfWords} word Comapny Bio with tone of voice ${toneOfVoice}. The Bio should be compelling so that the viewers find it engaging. Remember to only write responses to the given bio. Note:- Do not write the Bio of more than ${numberOfWords} words.`;

      const dataArray = await Promise.all(
        Array(numberOfGeneration)
          .fill("")
          .map((_, i) => fetcher(prompt))
      );

      await axios.post("/api/history", {
        prompt: `company name : ${companyName} | company features : ${companyFeatures} | tone of voice : ${toneOfVoice} | number of words : ${numberOfWords} | company details : ${companyDetails}`,
        content: dataArray.join("|"),
        type: HistoryType.BIO_FOR_COMPANY,
      });

      return dataArray;
    },
    onSuccess(data, variables, context) {
      setOutput(data);
      router.refresh();
    },
    onError(error: any, variables, context) {
      toast.error(error?.response?.data);
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
          <div className="flex flex-col gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of your company" {...field} />
                  </FormControl>
                  <FormDescription className="text-right">
                    {form.watch("companyName").length}/100
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyFeatures"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Company Features</FormLabel>
                  <FormControl>
                    <Input placeholder="Marketing, Sales" {...field} />
                  </FormControl>
                  <FormDescription className="text-right">
                    {form.watch("companyFeatures").length}/100
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="toneOfVoice"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tone Of Voice</FormLabel>
                  <FormControl>
                    <Input placeholder="Witty" {...field} />
                  </FormControl>
                  <FormDescription className="text-right">
                    {form.watch("toneOfVoice").length}/100
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberOfWords"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Number Of Words</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="10"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="numberOfGeneration"
            render={({ field }) => (
              <FormItem className="space-y-1 my-4">
                <FormLabel>Number Of Generations</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="bg-transparent text-gray-800 dark:text-white w-52 capitalize">
                      <SelectValue
                        className="capitalize"
                        placeholder="Select a image type"
                      />
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
            name="companyDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Details</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your company"
                    className="resize-none"
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormDescription className="text-right">
                  {form.watch("companyDetails").length}/1500
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {" "}
            {isLoading && (
              <Loader2 size={20} className="animate-spin mr-2" />
            )}{" "}
            Generate
          </Button>
        </form>
      </Form>

      <MultipleOutput outputs={output} />
    </div>
  );
};

export default Page;
