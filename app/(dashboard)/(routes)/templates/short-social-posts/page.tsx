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
import MultipleOutput from "@/components/mutliple-output";
import OutputBox from "@/components/output-box";
import { useRouter } from "next/navigation";
import { HistoryType } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetcher } from "@/lib/utils";

const formSchema = z.object({
  description: z.string().min(10).max(1500),
  audience: z.string().min(4).max(100),
  toneOfVoice: z.string().min(4),
  numberOfGeneration: z.number(),
});

const Page = () => {
  const [output, setOutput] = useState<string[] | []>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      audience: "",
      description: "",
      toneOfVoice: "",
      numberOfGeneration: 3,
    },
  });
  const router = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["product"],
    mutationFn: async ({
      audience,
      description,

      toneOfVoice,
      numberOfGeneration,
    }: z.infer<typeof formSchema>) => {
      const prompt = `Write a short social media whose content is  ${description}, this post is to target  ${audience}. write the short social media post keeping the tone of voice ${toneOfVoice}. The short social media post should be compelling so that the viewer is tempted to interact. Remember to only write short social media posts for the given content. Note:- Do not write other than a short social media post. Important point:- The short social media post has a word limit of 20 words so do not write the short social media post more than 20 words.`;
      const dataArray = await Promise.all(
        Array(numberOfGeneration)
          .fill("")
          .map((_, i) => fetcher(prompt))
      );
      await axios.post("/api/history", {
        prompt: `audience : ${audience} | tone of voice : ${toneOfVoice} | description : ${description}`,
        content: dataArray.join("|"),

        type: HistoryType.SHORT_SOCIAL_POSTS,
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
              name="audience"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Audience</FormLabel>
                  <FormControl>
                    <Input placeholder="Content writers" {...field} />
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
                  <FormLabel className="capitalize">Tone of voice</FormLabel>
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is this post about ?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="The topic or subject of the post"
                    {...field}
                    className="resize-none"
                    rows={5}
                  />
                </FormControl>
                <FormDescription className="text-right">
                  {form.watch("description").length}/1500
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
