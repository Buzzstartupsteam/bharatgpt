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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { HistoryType } from "@prisma/client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  videoTitle: z.string().min(4).max(100),
  description: z.string().min(10).max(1500),

  toneOfVoice: z.string().min(4),
});

const Page = () => {
  const [output, setOutput] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoTitle: "",

      description: "",
      toneOfVoice: "",
    },
  });
  const router = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["product description"],
    mutationFn: async ({
      description,
      videoTitle,
      toneOfVoice,
    }: z.infer<typeof formSchema>) => {
      const prompt = `Write a YouTube video script outline for the video title ${videoTitle}, the video is about ${description}. write the YouTube video script outline keeping the tone of voice ${toneOfVoice}.  The  YouTube video script outline should be compelling so that the viewer is tempted to interact. Remember to only write the YouTube video script outline for the given YouTube video. Note:- Do not write other than the YouTube video script outline.`;
      const { data } = await axios.post("/api/lumina", {
        prompt,
      });
      await axios.post("/api/history", {
        prompt: `title : ${videoTitle} | tone of voice : ${toneOfVoice} | description : ${description}`,
        content: data,
        type: HistoryType.YOUTUBE_VIDEO_SCRIPT_OUTLINE,
      });
      return data;
    },
    onSuccess(data, variables) {
      setOutput(data);
      router.refresh();
    },
    onError(error: any, variables, context) {
      toast.error(error?.response?.data || error.message);
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
          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="videoTitle"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Video Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormDescription className="text-right">
                    {form.watch("videoTitle").length}/100
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
                  <FormLabel>Tone of voice </FormLabel>
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
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is this video about ?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder=""
                    className="resize-none"
                    {...field}
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
            {isLoading && <Loader2 size={20} className="mr-2 animate-spin" />}{" "}
            Generate
          </Button>
        </form>
      </Form>

      {output && <OutputBox output={output} />}
    </div>
  );
};

export default Page;
