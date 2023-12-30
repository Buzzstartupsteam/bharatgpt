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

const formSchema = z.object({
  plot: z.string().min(10).max(1500),

  toneOfVoice: z.string().min(4),
});

const Page = () => {
  const [output, setOutput] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plot: "",
      toneOfVoice: "",
    },
  });
  const router = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["product"],
    mutationFn: async ({
      plot,

      toneOfVoice,
    }: z.infer<typeof formSchema>) => {
      const prompt = `Write a short story whose plot is ${plot} write the story keeping the tone of voice ${toneOfVoice}. The story post should be compelling so that the viewer is tempted to read. Remember to only write the story for the given plot. Note:- Do not write other than a story.`;
      const { data } = await axios.post("/api/lumina", {
        prompt,
      });

      await axios.post("/api/history", {
        prompt: `tone of voice : ${toneOfVoice} | plot : ${plot}`,
        content: data,
        type: HistoryType.STORY_WRITING,
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
              name="toneOfVoice"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="capitalize">Tone of voice</FormLabel>
                  <FormControl>
                    <Input placeholder="Engaging" {...field} />
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
            name="plot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Story Plot</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Create an engaging narrative with captivating characters, unexpected twists, and an unforgettable climax that leaves readers wanting more."
                    {...field}
                    className="resize-none"
                    rows={5}
                  />
                </FormControl>
                <FormDescription className="text-right">
                  {form.watch("plot").length}/1500
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
