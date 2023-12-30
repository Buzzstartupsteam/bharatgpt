"use client";
import Markdown from "@/components/Markdown";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { HistoryType } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  BarChart2,
  File,
  FileUp,
  Link,
  Loader2,
  Paperclip,
  Plus,
  Text,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import AnalyzeTour from "@/components/tour/analyze-tour";
import { httpsAgent } from "@/lib/agent";

const acceptedFileTypes = ["pdf", "xlsx", "docx", "csv"];

const urlFormSchema = z.object({
  url: z.string().url("Please provide valid url!").nonempty("Required!"),
});

const textFormSchema = z.object({
  text: z.string().nonempty("Required!"),
});

const tabs = [
  {
    text: "File",
    icon: File,
  },
  {
    text: "URL",
    icon: Link,
  },
  {
    text: "Text",
    icon: Text,
  },
];

const formSchema = z.object({
  prompt: z.string().nonempty(),
});

const Analyze = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | undefined>();
  const urlForm = useForm<z.infer<typeof urlFormSchema>>({
    resolver: zodResolver(urlFormSchema),
  });
  const textForm = useForm<z.infer<typeof textFormSchema>>({
    resolver: zodResolver(textFormSchema),
  });

  const reset = () => {
    setFile(undefined);
    textForm.reset();
    urlForm.reset();
  };

  const { mutate, isLoading } = useMutation({
    mutationKey: ["analyze"],
    mutationFn: async ({
      type,
      file,
      text,
      url,
    }: {
      type: "file" | "url" | "text";
      url?: string;
      file?: File;
      text?: string;
    }) => {
      const formData = new FormData();

      if (type == "url" && url) {
        formData.append("url", url);
      }
      if (type == "text" && text) {
        formData.append("text", text);
      }
      if (type == "file" && file) {
        formData.append("file", file);
      }
      // const { data } = await axios.post("/api/analyze/upload", formData);
      const { data } = await axios.post(
        "https://75.2.24.164/v1/custom/dataviser/upload",
        formData,
        {
          headers: { authorization: process.env.AI_API_KEY },
          httpsAgent: httpsAgent,
        }
      );
      await axios.post("/api/analyze", {
        title: (file && file.name) || url || text?.slice(0, 50),
        trainId: data.data.train_id,
      });
      return data.data.train_id;
    },
    onSuccess(data, variables, context) {
      router.refresh();
      reset();
      toast.success("Analyzed Successfully!");
      router.replace(`/analyze/${data}`);
    },
    onError(error, variables, context) {
      toast.error("Something went wrong:(");
    },
  });

  const textOnSubmit = (values: z.infer<typeof textFormSchema>) => {
    mutate({ type: "text", text: values.text });
  };
  const urlOnSubmit = (values: z.infer<typeof urlFormSchema>) => {
    mutate({ type: "url", url: values.url });
  };
  const fileOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("File is required!");
    }
    mutate({ type: "file", file });
  };

  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const firstFile = files[0];
    if (firstFile) {
      if (!acceptedFileTypes.includes(firstFile.name.split(".").pop()!)) {
        toast.error("Invalid file type!");
        return;
      }
      setFile(firstFile);
    }
  };

  return (
    <>
      {/* <AnalyzeInfo /> */}
      <AnalyzeTour />
      <div className="px-4 lg:px-8 pb-6 space-y-6">
        <Tabs defaultValue="File">
          <TabsList>
            {tabs.map(({ icon: Icon, text }) => (
              <TabsTrigger key={text} value={text}>
                <Icon className="h-4 w-4 mr-2" />

                {text}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="File">
            <form onSubmit={fileOnSubmit} id="analyze-input">
              <Label>Select Document</Label>
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center w-full p-5 mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl mb-4"
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Paperclip className="text-gray-500 dark:text-gray-400 h-8 w-8" />

                <p className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">
                  {file ? file.name : "Select File"}
                </p>

                <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
                  {dragging
                    ? "Drop the files here ..."
                    : "Upload or drag & drop your file DOC, PDF, XLSX."}
                </p>

                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept=".pdf, .docx, .xlsx, .csv"
                  onChange={(e) => e.target.files && setFile(e.target.files[0])}
                />
              </label>
              <Button
                className="flex ml-auto"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && (
                  <Loader2 size={20} className="animate-spin mr-2" />
                )}
                Analyze
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="URL">
            <Form {...urlForm}>
              <form
                onSubmit={urlForm.handleSubmit(urlOnSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={urlForm.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://www.example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="flex ml-auto"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading && (
                    <Loader2 size={20} className="animate-spin mr-2" />
                  )}
                  Analyze
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="Text">
            <Form {...textForm}>
              <form
                onSubmit={textForm.handleSubmit(textOnSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={textForm.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Text</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={8}
                          minRows={8}
                          maxRows={15}
                          className="resize-none"
                          placeholder="Text you want to analyze"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="flex ml-auto"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2 size={20} className="animate-spin mr-2" />
                  )}
                  Analyze
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Analyze;
