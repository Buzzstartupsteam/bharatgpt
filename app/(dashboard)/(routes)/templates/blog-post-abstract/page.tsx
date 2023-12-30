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
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";
import OutputBox from "@/components/output-box";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { HistoryType } from "@prisma/client";

const formSchema = z.object({
  blogTitle: z.string().min(4),
  toneOfVoice: z.string().min(4),
  blog: z.string().min(10).max(1500),
});

const Page = () => {
  const [output, setOutput] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blog: "",
      blogTitle: "",
      toneOfVoice: "",
    },
  });

  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      blog,
      blogTitle,
      toneOfVoice,
    }: z.infer<typeof formSchema>) => {
      const prompt = `consider the blog"${blog}", the title of the blog is ${blogTitle}. Rewrite the blog keeping the word count the same as the given content with the tone of voice ${toneOfVoice}. The blog should be compelling so that the viewer engages in the rewritten blog. Remember to only write the blog for the given input blog. Note:- Do not write other than the blog and keep the word count similar.`;
      const { data } = await axios.post("/api/lumina", {
        prompt,
      });

      await axios.post("/api/history", {
        prompt: `blog title : ${blogTitle} | tone of voice : ${toneOfVoice} | blog : ${blog}`,
        content: data,
        type: HistoryType.BLOG_POST_ABSTRACT,
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
          <div className="flex flex-col gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="blogTitle"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Blog Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Personal development" {...field} />
                  </FormControl>
                  <FormDescription className="text-right">
                    {form.watch("blogTitle").length}/100
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
            name="blog"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Blog Summary</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="This blog focuses on helping individuals achieve personal growth and development in various aspects of their lives."
                    className="resize-none"
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormDescription className="text-right">
                  {form.watch("blog").length}/1500
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {" "}
            {isLoading && (
              <Loader2 size={20} className="mr-2 animate-spin" />
            )}{" "}
            Generate
          </Button>
        </form>
      </Form>

      {output && <OutputBox output={output} />}
    </div>
  );
};

export default Page;
