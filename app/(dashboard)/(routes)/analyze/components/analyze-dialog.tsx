"use client";
import React, { FC, useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link, Loader2, Plus, Text, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Paperclip } from "lucide-react";
import { httpsAgent } from "@/lib/agent";

const acceptedFileTypes = ["pdf", "xlsx", "docx", "csv"];

const urlFormSchema = z.object({
  url: z.string().url("Please provide valid url!").nonempty("Required!"),
});

const textFormSchema = z.object({
  text: z.string().nonempty("Required!"),
});

interface AnalyzeDialogProps {
  train_id: string;
}

const AnalyzeDialog: FC<AnalyzeDialogProps> = ({ train_id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const [dragging, setDragging] = useState(false);

  //
  const textForm = useForm<z.infer<typeof textFormSchema>>({
    resolver: zodResolver(textFormSchema),
  });
  const urlForm = useForm<z.infer<typeof urlFormSchema>>({
    resolver: zodResolver(urlFormSchema),
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
      formData.append("train_id", train_id);
      if (type == "url" && url) {
        formData.append("url", url);
      }
      if (type == "text" && text) {
        formData.append("text", text);
      }
      if (type == "file" && file) {
        formData.append("file", file);
      }
      const { data } = await axios.post(
        "https://75.2.24.164/v1/custom/dataviser/upload",
        formData,
        {
          headers: { authorization: process.env.AI_API_KEY },
          httpsAgent: httpsAgent,
        }
      );

      return data.data.train_id;
    },
    onSuccess(data, variables, context) {
      toast.success("Analyzed Successfully!");
      reset();
      setIsOpen(false);
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
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (isLoading) {
          return;
        }
        setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button className="h-12 w-12 shrink-0">
          <Plus size={25} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Analyze</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="file">
          <TabsList>
            {["file", "url", "text"].map((type) => (
              <TabsTrigger key={type} className="capitalize" value={type}>
                {type}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="file">
            <form className="space-y-4 pt-2" onSubmit={fileOnSubmit}>
              <div className="flex flex-col gap-3">
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

                  <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">
                    {file ? file.name : "Select File"}
                  </h2>

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
                    onChange={(e) =>
                      e.target.files && setFile(e.target.files[0])
                    }
                  />
                </label>
              </div>
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
          <TabsContent value="url">
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
          <TabsContent value="text">
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
                          rows={5}
                          minRows={5}
                          maxRows={10}
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
      </DialogContent>
    </Dialog>
  );
};

export default AnalyzeDialog;
