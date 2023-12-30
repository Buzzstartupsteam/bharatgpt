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
  title: z.string().min(4).max(100),
  passageDescription: z.string().min(10).max(1500),
  keywords: z.string().min(4).max(100),
  toneOfVoice: z.string().min(4),
});

const Page = () => {
  const [output, setOutput] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      keywords: "",
      passageDescription: "",
      toneOfVoice: "",
    },
  });

  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["product"],
    mutationFn: async ({
      keywords,
      passageDescription,
      title,
      toneOfVoice,
    }: z.infer<typeof formSchema>) => {
      const prompt = `Write a paragraph for the title ${title}. The content of the paragraph should be ${passageDescription} Write the paragraph with the tone of voice ${toneOfVoice} where the keywords to be used are ${keywords}. The paragraph should be compelling so that the viewer engages in the written paragraph. Remember to only write the paragraph for the given input title. Note:- Do not write other than the paragraph`;
      const { data } = await axios.post("/api/lumina", {
        prompt,
      });

      await axios.post("/api/history", {
        prompt: `title : ${title} | keywords : ${keywords} | tone of voice : ${toneOfVoice} | passage description : ${passageDescription}`,
        content: data,
        type: HistoryType.PASSAGE_WRITER,
      });

      return data;
    },
    onSuccess(data, variables, context) {
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
          <div className="flex flex-col gap-4 md:flex-row md:justify-between mb-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Title/Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormDescription className="text-right">
                    {form.watch("title").length}/100
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Keywords</FormLabel>
                  <FormControl>
                    <Input placeholder="article, essay, blog " {...field} />
                  </FormControl>
                  <FormDescription className="text-right">
                    {form.watch("keywords").length}/100
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
                    <Input
                      placeholder=" general, technical, academic"
                      {...field}
                    />
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
            name="passageDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is this paragraph about?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please provide a detailed description of the situation or context in which you would like the paragraph"
                    {...field}
                    rows={5}
                    className="resize-none"
                  />
                </FormControl>
                <FormDescription className="text-right">
                  {form.watch("passageDescription").length}/1500
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
