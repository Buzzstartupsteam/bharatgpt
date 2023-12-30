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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultipleOutput from "@/components/mutliple-output";
import { fetcher } from "@/lib/utils";

const formSchema = z.object({
  username: z.string().min(4).max(100),
  personalInfo: z.string().min(10).max(1500),
  pov: z.string().min(4).max(100),
  toneOfVoice: z.string().min(4),
  numberOfWords: z.string().min(2).max(10),
  numberOfGeneration: z.number(),
});

const Page = () => {
  const [output, setOutput] = useState<string[] | []>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      pov: "",
      personalInfo: "",
      toneOfVoice: "",
      numberOfWords: "10",
      numberOfGeneration: 3,
    },
  });

  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      personalInfo,
      pov,
      toneOfVoice,
      username,
      numberOfWords,
      numberOfGeneration,
    }: z.infer<typeof formSchema>) => {
      const prompt = `Write a personal bio for ${username}, from ${pov} person's point of view. their personal info is ${personalInfo}, write a ${numberOfWords} word personal Bio with tone of voice ${toneOfVoice}. The Bio should be compelling so that the viewer opens the profile. Remember to only write responses to the given bio. Note:- Do not write the Bio of more than ${numberOfWords} words.`;

      const dataArray = await Promise.all(
        Array(numberOfGeneration)
          .fill("")
          .map((_, i) => fetcher(prompt))
      );

      await axios.post("/api/history", {
        prompt: `username : ${username} | pov : ${pov} | tone of voice : ${toneOfVoice} | number of words : ${numberOfWords} | personal info : ${personalInfo}`,
        content: dataArray.join("|"),
        type: HistoryType.CREATIVE_BIO,
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
    mutate(values);
  }
  return (
    <div className="flex-1 py-6 px-4 lg:px-8 space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between mb-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription className="text-right">
                    {form.watch("username").length}/100
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pov"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>POV (Point Of View)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First Person, Third Person"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-right">
                    {form.watch("pov").length}/100
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:justify-between mb-4">
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
                      placeholder="Number of words"
                      {...field}
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
                        placeholder="Number Of Generations"
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
            name="personalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Personal Info</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your background, personality, interests, and achievements in a concise manner."
                    className="resize-none"
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormDescription className="text-right">
                  {form.watch("personalInfo").length}/1500
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

      {output.length !== 0 && <MultipleOutput outputs={output} />}
    </div>
  );
};

export default Page;
