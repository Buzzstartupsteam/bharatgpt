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
import axios from "axios";
import { toast } from "react-hot-toast";
import OutputBox from "@/components/output-box";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { HistoryType } from "@prisma/client";

const formSchema = z.object({
  blogName: z.string().min(4).max(100),
  mainPoints: z.string().min(10).max(1500),
  cta: z.string().min(4).max(100),
  toneOfVoice: z.string().min(4),
});

const Page = () => {
  const [output, setOutput] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blogName: "",
      cta: "",
      mainPoints: "",
      toneOfVoice: "",
    },
  });

  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      blogName,
      cta,
      mainPoints,
      toneOfVoice,
    }: z.infer<typeof formSchema>) => {
      const prompt = `consider the blog with the main point of the blog being "${mainPoints}", the title of the blog is ${blogName}. write the blog conclusion paragraph with the tone of voice ${toneOfVoice} where the call to action of the paragraph should be ${cta}. The conclusion paragraph should be compelling so that the viewer engages in the written blog. Remember to only write the conclusion paragraph for the given input blog outline. Note:- Do not write other than the conclusion paragraph`;
      const { data } = await axios.post("/api/lumina", { prompt });

      await axios.post("/api/history", {
        prompt: `blog name : ${blogName} | cta : ${cta} | main points : ${mainPoints} | tone of voice : ${toneOfVoice}`,
        content: data,
        type: HistoryType.BLOG_POST_CONCLUSION_CLAUSE,
      });

      return data;
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
              name="blogName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Blog Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Personal development" {...field} />
                  </FormControl>
                  <FormDescription className="text-right">
                    {form.watch("blogName").length}/100
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
            name="cta"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Call To Action</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Join us on an exciting journey of personal growth and transformation"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-right">
                  {form.watch("cta").length}/100
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mainPoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Main Points / Blog Outlines</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="This blog focuses on helping individuals achieve personal growth and development in various aspects of their lives."
                    className="resize-none"
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormDescription className="text-right">
                  {form.watch("mainPoints").length}/1500
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

      <OutputBox output={output} />
    </div>
  );
};

export default Page;
