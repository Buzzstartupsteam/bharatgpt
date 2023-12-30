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
  content: z.string().min(10).max(1500),
  toneOfVoice: z.string().min(4),
  contentType: z.string().min(10),
});

const Page = () => {
  const [output, setOutput] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contentType: "",
      content: "",
      toneOfVoice: "",
    },
  });

  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      content,
      contentType,
      toneOfVoice,
    }: z.infer<typeof formSchema>) => {
      const { data } = await axios.post("/api/lumina", {
        prompt: `consider the content "${content}", the type of content is ${contentType}. Rewrite the content keeping the word count the same as the given content with the tone of voice ${toneOfVoice}. The content should be compelling so that the viewer engages in the rewritten content. Remember to only write content for the given input content. Note:- Do not write other than content and keep the word count similar.`,
      });

      await axios.post("/api/history", {
        prompt: `content type : ${contentType} | tone of voice : ${toneOfVoice} | content : ${content}`,
        content: data,
        type: HistoryType.CONTENT_UPGRADER,
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
              name="contentType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>What type of content are you creating ?</FormLabel>
                  <FormControl>
                    <Input placeholder="Content type" {...field} />
                  </FormControl>
                  <FormDescription className="text-right">
                    {form.watch("contentType").length}/100
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

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What content would you like to improve?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write the text or material you desire to enhance or make better"
                    className="resize-none"
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormDescription className="text-right">
                  {form.watch("content").length}/1500
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
