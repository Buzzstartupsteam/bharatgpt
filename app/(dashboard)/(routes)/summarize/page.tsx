"use client";
import { Heading } from "@/components/heading";
import { Layers, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import CopyToClipboard from "@/components/copy-to-clipboard";
import { HistoryType } from "@prisma/client";
import { useRouter } from "next/navigation";
import SummarizeInfo from "@/components/dialogs/summarize-info";
import { useProModal } from "@/hooks/use-pro-modal";
import SummarizeTour from "@/components/tour/summarize-tour";

const formSchema = z.object({
  text: z.string().min(4).max(20000),
  length: z.enum(["auto", "short", "medium", "long"]),
  format: z.enum(["bullet_point", "paragraph"]),
});

const Summarize = () => {
  const { onOpen } = useProModal();
  const [output, setOutput] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      format: "paragraph",
      length: "auto",
    },
  });

  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["summrize"],
    mutationFn: async ({
      length,
      format,
      text,
    }: z.infer<typeof formSchema>) => {
      const { data } = await axios.post("/api/summarize", {
        text,
        format,
        length,
      });
      await axios.post("/api/history", {
        prompt: text,
        content: data,
        type: HistoryType.SUMMARIZE,
      });
      return data;
    },
    onSuccess(data, variables, context) {
      setOutput(data);
      router.refresh();
    },
    onError(error: any) {
      if (error?.response?.status === 403) {
        onOpen();
        return;
      }
      toast.error(error?.response.data || error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <>
      {/* <SummarizeInfo /> */}
      <SummarizeTour />
      <div className="py-6 px-4 lg:px-8 scrollbar-hide overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem id="summarize-input">
                  <FormLabel>Text to summarize</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      minRows={5}
                      rows={5}
                      maxRows={10}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="flex justify-end">
                    {form.watch("text").length}/20000
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 flex-col md:flex-row">
              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem id="summarize-length">
                    <FormLabel>Character Length</FormLabel>

                    <Select
                      onValueChange={(
                        value: "auto" | "short" | "medium" | "long"
                      ) => field.onChange(value)}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-transparent text-gray-800 dark:text-white w-52 capitalize">
                          <SelectValue placeholder="Select Length" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[15rem] overflow-y-auto capitalize">
                        {["auto", "short", "medium", "long"].map((length) => (
                          <SelectItem key={length} value={length}>
                            {length}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="format"
                render={({ field }) => (
                  <FormItem id="summarize-format">
                    <FormLabel>Format</FormLabel>
                    <Select
                      onValueChange={(
                        value: "bullet_point" | "paragraph"
                      ) => field.onChange(value)}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-transparent text-gray-800 dark:text-white w-52 capitalize">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[15rem] overflow-y-auto">
                        {["bullet_point", "paragraph"].map((length) => (
                          <SelectItem
                            className="capitalize"
                            key={length}
                            value={length}
                          >
                            {length.split("_").join(" ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="ml-auto flex" type="submit" disabled={isLoading}>
              {isLoading && <Loader2 size={20} className="mr-2 animate-spin" />}
              Summarize
            </Button>
          </form>
        </Form>

        {output && (
          <div className="space-y-4 p-4 border rounded-xl mt-6">
            <div className="flex justify-between">
              <h2 className="uppercase font-semibold">Output</h2>
              <CopyToClipboard text={output} />
            </div>
            <div>
              <ReactMarkdown className="prose dark:prose-invert max-w-4xl">
                {output}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Summarize;
