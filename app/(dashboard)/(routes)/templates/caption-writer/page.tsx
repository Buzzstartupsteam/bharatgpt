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
import { HistoryType } from "@prisma/client";
import { useRouter } from "next/navigation";
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
  socialMedia: z.string().min(4).max(100),
  language: z.string().min(4).max(100),
  toneOfVoice: z.string().min(4),
  postDescription: z.string().min(10).max(1500),
  numberOfGeneration: z.number(),
});

const Page = () => {
  const [output, setOutput] = useState<string[] | []>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "",
      postDescription: "",
      socialMedia: "",
      toneOfVoice: "",
      numberOfGeneration: 3,
    },
  });

  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      language,
      postDescription,
      socialMedia,
      toneOfVoice,
      numberOfGeneration,
    }: z.infer<typeof formSchema>) => {
      const prompt = `write the caption of a post in ${socialMedia} in ${language} language, the post is about ${postDescription}. Write a 20-word caption keeping the tone of voice ${toneOfVoice}.
      This caption should be attractive to read so that the viewer is compelled to like the post. The word limit is 20. Remember to only write the caption to the given post. Note:-  Do not caption more than 20 words`;

      const dataArray = await Promise.all(
        Array(numberOfGeneration)
          .fill("")
          .map((_, i) => fetcher(prompt))
      );

      await axios.post("/api/history", {
        prompt: `language : ${language} | social media : ${socialMedia} | tone of voice : ${toneOfVoice} | post description : ${postDescription}`,
        content: dataArray.join("|"),
        type: HistoryType.CAPTION_WRITER,
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
              name="language"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input placeholder="English" {...field} />
                  </FormControl>
                  <FormDescription className="text-right">
                    {form.watch("language").length}/100
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="socialMedia"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Social Media</FormLabel>
                  <FormControl>
                    <Input placeholder="Instagram" {...field} />
                  </FormControl>
                  <FormDescription className="text-right">
                    {form.watch("socialMedia").length}/100
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
                        placeholder="Select a image type"
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

          {/* post description */}
          <FormField
            control={form.control}
            name="postDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is this post about ?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please provide details about the content of a social media post so I can create a catchy caption."
                    className="resize-none"
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormDescription className="text-right">
                  {form.watch("postDescription").length}/1500
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
