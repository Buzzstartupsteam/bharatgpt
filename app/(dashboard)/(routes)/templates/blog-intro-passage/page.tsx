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
import { Loader2 } from "lucide-react";
import OutputBox from "@/components/output-box";
import { HistoryType } from "@prisma/client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  blogTitle: z.string().min(4).max(100),
  audience: z.string().min(4).max(100),
  toneOfVoice: z.string().min(4),
});

const Page = () => {
  const [output, setOutput] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blogTitle: "",
      audience: "",
      toneOfVoice: "",
    },
  });

  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      audience,
      blogTitle,
      toneOfVoice,
    }: z.infer<typeof formSchema>) => {
      const prompt = `Write an intro paragraph for the blog with the title ${blogTitle}. Write the blog intro paragraph with the tone of voice ${toneOfVoice} where the blog will target ${audience}. The intro paragraph should be compelling so that the viewer engages in the written blog. Remember to only write the intro paragraph for the given input blog title. Note:- Do not write other than the intro paragraph`;

      const { data } = await axios.post("/api/lumina", { prompt });

      await axios.post("/api/history", {
        prompt: `blog title : ${blogTitle} | tone of voice : ${toneOfVoice} | audience : ${audience}`,
        content: data,
        type: HistoryType.BLOG_INTRO_PASSAGE,
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
          <FormField
            control={form.control}
            name="blogTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Title</FormLabel>
                <FormControl>
                  <Input placeholder="Blog" {...field} />
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
            name="audience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Audience</FormLabel>
                <FormControl>
                  <Input placeholder="Programers, Content writers" {...field} />
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
              <FormItem>
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
