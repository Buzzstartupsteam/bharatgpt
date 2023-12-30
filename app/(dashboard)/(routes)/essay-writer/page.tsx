"use client";

import * as z from "zod";
import axios from "axios";
import { MessageSquare } from "lucide-react";
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

import { PenLine } from "lucide-react";
import { useEssay } from "@/hooks/useEssay";
import { DotWave } from "@uiball/loaders";
import CopyToClipboard from "@/components/copy-to-clipboard";
import ReactMarkdown from "react-markdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { essayTypes } from "@/constants";
import EssayInfo from "@/components/dialogs/essay-info";
import EssayWriterTour from "@/components/tour/essay-writer-tour";

const formSchema = z.object({
  prompt: z.string().min(4),
  tone: z.string().nonempty(),
});

const EssayWriter = () => {
  const router = useRouter();
  const proModal = useProModal();
  const { essay, setEssay } = useEssay();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      tone: "Narrative",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const { data } = await axios.post("/api/lumina", {
        prompt: `Write an Essay, The topic of the essay is:${values.prompt}.  Write an essay using the tone of voice ${values.tone}. The 500 word Essay should be compelling so that the viewer is tempted to read. Remember to only write a 500-word essay for the given input video title. Note:- Do not write other than the 500 Word essay. 
        Response format:-
        Title:- Title
        Introduction: Introduction paragraph
        Body paragraphs(heading can be anything related to the topic)
        Conclusion:- Conclusion paragraph`,
      });

      await axios.post("/api/history", {
        prompt: values.prompt,
        content: data,
        type: "ESSAY",
      });

      setEssay(data);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      {/* <EssayInfo /> */}
      <EssayWriterTour />
      <div className="px-4 lg:px-8 overflow-y-auto scrollbar-hide divide-y">
        <div className="pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem id="essay-topic">
                    <FormLabel>Essay Topic</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="global warming"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem className="space-y-1 mt-4" id="essay-tone">
                    <FormLabel>Tone Of Voice</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-transparent text-gray-800 dark:text-white w-52">
                          <SelectValue placeholder="Select a Language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[15rem] overflow-y-auto">
                        {essayTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <div className="flex gap-4 justify-end">
                <Button
                  className=""
                  type="button"
                  variant="ghost"
                  disabled={isLoading}
                  onClick={() => setEssay("")}
                >
                  Reset
                </Button>
                <Button className="" type="submit" disabled={isLoading}>
                  Generate
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="pt-6 pb-20 w-full">
          {isLoading ? (
            <div className="flex justify-center items-center h-80">
              {/* <Loader2 className="h-4 w-4 animate-spin" /> */}
              <DotWave size={47} speed={1} color="rgb(14 165 233)" />
            </div>
          ) : (
            essay && (
              <>
                <h3 className="text-xl md:text-2xl font-semibold ml-4 mb-2 ">
                  Generated Essay :
                </h3>
                <div className="p-4 md:p-6 lg:p-8 border rounded-lg relative">
                  <div className="absolute right-6 top-6">
                    <CopyToClipboard text={essay} />
                  </div>
                  <ReactMarkdown className="prose max-w-full dark:prose-invert">
                    {essay}
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

export default EssayWriter;
