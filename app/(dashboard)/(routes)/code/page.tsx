"use client";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
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
import { useProModal } from "@/hooks/use-pro-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CopyToClipboard from "@/components/copy-to-clipboard";
import { programmingLanguages } from "@/constants";
import { useCode } from "@/hooks/useCode";
import { DotWave } from "@uiball/loaders";
import { useQuery } from "@tanstack/react-query";
import Markdown from "@/components/Markdown";
import { Loader2 } from "lucide-react";
import CodeInfo from "@/components/dialogs/code-info";
import { Textarea } from "@/components/ui/textarea";
import CodeTour from "@/components/tour/code-tour";

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
  language: z.string(),
});

const CodePage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const { code, setCode } = useCode();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      language: "Python",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await axios.post("/api/lumina", {
        prompt: `You are a professional code writer tasked with writing codes for various purposes which are mentioned ahead. You only write codes and follow a proper code, that should be correct lexically, semantically, and syntactically correct(markdown format =
              code_here
              ). If the coding language is not specified ahead please use ${values.language} as the default language to write codes in. The following is the topic for the code to be written:
              "${values.prompt}"`,
      });

      await axios.post("/api/history", {
        prompt: `${values.prompt} in ${values.language}`,
        content: data,
        type: "CODE",
      });

      setCode(data);

      form.resetField("prompt");
    } catch (error: any) {
      console.log(error);
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error(error?.response?.data ?? "Something went wrong:(");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      {/* <CodeInfo /> */}
      <CodeTour />
      <div className="px-4 lg:px-8 overflow-y-auto scrollbar-hide divide-y">
        <div className="pb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="" id="code-input">
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Textarea
                        className=""
                        rows={5}
                        minRows={5}
                        maxRows={7}
                        disabled={isLoading}
                        placeholder="Find factorial of a number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 items-end flex-wrap">
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem className="space-y-1" id="select-language">
                      <FormLabel>Select Language</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-transparent text-gray-800 dark:text-white w-52">
                            <SelectValue placeholder="Select a Language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[15rem] overflow-y-auto">
                          {programmingLanguages.map((language) => (
                            <SelectItem key={language} value={language}>
                              {language}
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
                    onClick={() => {
                      form.reset();
                      setCode("");
                    }}
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
        <div className="pt-6 pb-20 w-full">
          {isLoading ? (
            <div className="flex justify-center items-center h-80">
              <DotWave size={47} speed={1} color="rgb(14 165 233)" />
            </div>
          ) : (
            code && (
              <>
                <h3 className="text-xl md:text-2xl font-semibold ml-4 mb-2 ">
                  Generated Code :
                </h3>
                <div className="p-4 md:p-6 lg:p-8 border rounded-lg relative">
                  <div className="absolute right-6 top-6">
                    <CopyToClipboard text={code} />
                  </div>
                  <Markdown markdown={code} />
                </div>
              </>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default CodePage;
