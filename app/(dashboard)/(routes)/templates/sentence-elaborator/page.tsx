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
import { HistoryType } from "@prisma/client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  sentence: z.string().min(4).max(1000),

  toneOfVoice: z.string().min(4),
});

const Page = () => {
  const [output, setOutput] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sentence: "",

      toneOfVoice: "",
    },
  });

  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["product"],
    mutationFn: async ({
      sentence,
      toneOfVoice,
    }: z.infer<typeof formSchema>) => {
      const prompt = `write an elaborated sentence for the given sentence ${sentence}. Write the elaborated sentence keeping the tone of voice ${toneOfVoice}. Remember to only write elaborated sentences for the given input sentence. Note:- Do not write anything other than the elaborated sentence.`;
      const { data } = await axios.post("/api/lumina", {
        prompt,
      });

      await axios.post("/api/history", {
        prompt: `tone of voice : ${toneOfVoice} | sentence : ${sentence}`,
        content: data,
        type: HistoryType.SENTENCE_ELABORATOR,
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
          <FormField
            control={form.control}
            name="sentence"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="capitalize">Sentence to expand</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder="blog post, article, email subject"
                    {...field}
                    className="resize-none"
                  />
                </FormControl>
                <FormDescription className="text-right">
                  {form.watch("sentence").length}/1000
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
                  <Input placeholder="Witty " {...field} />
                </FormControl>
                <FormDescription className="text-right">
                  {form.watch("toneOfVoice").length}/100
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
