"use client";

import * as z from "zod";
import axios from "axios";
import { Loader2, MessageSquare, Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";

import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";
import { Wand2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";
import { moods, personalities, sentiments, tonesOfVoice } from "@/constants";
import CopyToClipboard from "@/components/copy-to-clipboard";
import { DotWave } from "@uiball/loaders";
import ReactMarkdown from "react-markdown";
import { useContent } from "@/hooks/useContent";
import ContentCreatorInfo from "@/components/dialogs/content-creator-info";
import ContentCreatorTour from "@/components/tour/content-creator-tour";

const formSchema = z.object({
  prompt: z.string().min(4),
  mood: z.string().nonempty(),
  personality: z.string().nonempty(),
  sentiment: z.string().nonempty(),
  toneOfVoice: z.string().nonempty(),
});

const ContentWriter = () => {
  const router = useRouter();
  const proModal = useProModal();

  const { text, setText } = useContent();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      mood: "none",
      personality: "none",
      sentiment: "none",
      toneOfVoice: "none",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await axios.post("/api/lumina", {
        prompt: `Write a Content for "${values.prompt}". Write the content using the tone of voice ${values.toneOfVoice}. The mood of the content is ${values.mood} with the personality being ${values.personality} and sentiment being ${values.sentiment}. The Content should be compelling so that the viewer is tempted to interact. Remember to only write the Content for the given input. Note:- Do not write other than the Content. 
        Response format:-
        Title:- Title
        Description:- Content`,
      });

      // create history
      await axios.post("/api/history", {
        prompt: values.prompt,
        content: data,
        type: "CONTENT",
      });

      setText(data);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error(error?.response?.data);
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      {/* <ContentCreatorInfo /> */}
      <ContentCreatorTour />
      <div className="px-4 lg:px-8 overflow-y-auto scrollbar-hide divide-y">
        <div className="pb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="" id="cc-input">
                    <FormLabel>Content Topic</FormLabel>
                    <FormControl>
                      <Input
                        className=""
                        disabled={isLoading}
                        placeholder="Write a youtube video script"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 flex-wrap lg:justify-between items-end">
                {/* mood select menu */}
                <FormField
                  control={form.control}
                  name="mood"
                  render={({ field }) => (
                    <FormItem className="space-y-1" id="cc-mood">
                      <FormLabel className="ml-2">Mood</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-transparent text-gray-800 dark:text-white w-52">
                            <SelectValue placeholder="Select a Language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[15rem] overflow-y-auto">
                          <SelectItem value="none">None</SelectItem>
                          {moods.map((mood) => (
                            <SelectItem key={mood} value={mood}>
                              {mood}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/* personality select menu */}
                <FormField
                  control={form.control}
                  name="personality"
                  render={({ field }) => (
                    <FormItem className="space-y-1" id="cc-personality">
                      <FormLabel className="ml-2">Personality</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-transparent text-gray-800 dark:text-white w-52">
                            <SelectValue placeholder="Select a Language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[15rem] overflow-y-auto">
                          <SelectItem value="none">None</SelectItem>
                          {personalities.map((personality) => (
                            <SelectItem key={personality} value={personality}>
                              {personality}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                {/* sentiments select menu */}
                <FormField
                  control={form.control}
                  name="sentiment"
                  render={({ field }) => (
                    <FormItem className="space-y-1" id="cc-sentiment">
                      <FormLabel className="ml-2">Sentiment</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-transparent text-gray-800 dark:text-white w-52">
                            <SelectValue placeholder="Select Sentiment" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[15rem] overflow-y-auto">
                          <SelectItem value="none">None</SelectItem>
                          {sentiments.map((sentiment) => (
                            <SelectItem key={sentiment} value={sentiment}>
                              {sentiment}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                {/* tone of voice select menu */}
                <FormField
                  control={form.control}
                  name="toneOfVoice"
                  render={({ field }) => (
                    <FormItem className="space-y-1" id="cc-tone">
                      <FormLabel className="ml-2">Tone of voice</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-transparent text-gray-800 dark:text-white w-52">
                            <SelectValue placeholder="Select a Language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[15rem] overflow-y-auto">
                          <SelectItem value="none">None</SelectItem>
                          {tonesOfVoice.map((tone) => (
                            <SelectItem key={tone} value={tone}>
                              {tone}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <div className="flex gap-4 justify-end w-full">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setText("")}
                    disabled={isLoading}
                  >
                    Reset
                  </Button>

                  <Button type="submit" disabled={isLoading}>
                    Generate
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>

        {/* output container */}
        <div className="pt-6 pb-20 w-full">
          {isLoading ? (
            <div className="flex justify-center items-center h-80">
              <DotWave size={47} speed={1} color="rgb(14 165 233)" />
            </div>
          ) : (
            text && (
              <>
                <h3 className="text-xl md:text-2xl font-semibold ml-4 mb-2 ">
                  Generated Content :
                </h3>
                <div className="p-4 md:p-6 lg:p-8 border rounded-lg relative">
                  <div className="absolute right-6 top-6">
                    <CopyToClipboard text={text} />
                  </div>
                  <ReactMarkdown className="prose max-w-full dark:prose-invert">
                    {text}
                  </ReactMarkdown>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default ContentWriter;
