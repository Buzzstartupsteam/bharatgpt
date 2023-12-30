"use client";

import * as z from "zod";
import axios from "axios";
import { Loader2, Mail, MessageSquare } from "lucide-react";
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

import ReactMarkdown from "react-markdown";
import CopyToClipboard from "@/components/copy-to-clipboard";
import { DotWave } from "@uiball/loaders";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { emailTones } from "@/constants";
import { useEmail } from "@/hooks/useEmail";
import { HistoryType } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import EmailInfo from "@/components/dialogs/email-info";
import EmailWriterTour from "@/components/tour/email-writer-tour";

const replyEmailSchema = z.object({
  prompt: z.string().nonempty(),
  emailToReply: z.string().min(4).max(1000),
  tone: z.string().nonempty(),
  emailType: z.literal("reply email"),
});
const writeEmailSchema = z.object({
  prompt: z.string().nonempty(),
  tone: z.string().nonempty(),
  emailType: z.literal("write email"),
});

const formSchema = z.discriminatedUnion("emailType", [
  replyEmailSchema,
  writeEmailSchema,
]);

const EmailGenerator = () => {
  const { email, setEmail } = useEmail();
  const router = useRouter();
  const proModal = useProModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tone: "Formal",
      emailType: "write email",
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let prompt = "";
      if (values.emailType === "reply email") {
        prompt = `Write an email reply for the email ${values.emailToReply}. The content to include in the email reply is ${values.prompt}. Write an email reply keeping the Tone of Voice ${values.tone}. Remember to only write the email reply for the given input email. Note:- Do not write other than the email reply.`;
      } else {
        prompt = `You are a professional email writer tasked with writing emails for various purposes which are mentioned ahead. You only write emails and follow a proper email pattern. The following is the topic and tone for the email to be written: 
        Topic : "${values.prompt}", Tone : "${values.tone}"`;
      }

      const { data } = await axios.post("/api/lumina", { prompt });

      await axios.post("/api/history", {
        prompt: values.prompt,
        content: data,
        type: HistoryType.EMAIL,
      });

      setEmail(data);

      if (values.emailType === "write email") {
        form.reset({ prompt: "" });
      } else {
        form.reset({ prompt: "", emailToReply: "" });
      }
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
      {/* <EmailInfo /> */}
      <EmailWriterTour />
      <div className="pb-6 px-4 scrollbar-hide overflow-y-auto">
        <div className="px-4 lg:px-8">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="emailType"
                  render={({ field }) => (
                    <FormItem className="space-y-1 mt-4" id="email-type">
                      <FormLabel>Email Type</FormLabel>
                      <Select
                        onValueChange={(value: "write email" | "reply email") =>
                          field.onChange(value)
                        }
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-transparent text-gray-800 dark:text-white w-52 capitalize">
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="overflow-y-auto capitalize">
                          {["write email", "reply email"].map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {form.watch("emailType") === "reply email" && (
                  <FormField
                    name="emailToReply"
                    shouldUnregister
                    render={({ field }) => (
                      <FormItem className="max-w-lg">
                        <FormLabel>Share the email for reply</FormLabel>
                        <FormControl className="">
                          <Textarea
                            className="resize-none"
                            disabled={isLoading}
                            {...field}
                            rows={5}
                            minRows={5}
                            maxRows={7}
                            placeholder="Please provide the email to which you would like the reply to be generated."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="max-w-lg" id="email-topic">
                      <FormLabel>
                        {form.watch("emailType") === "reply email"
                          ? "Email reply content of your choice"
                          : "What is this email about?"}
                      </FormLabel>
                      <FormControl className="">
                        <Input
                          className=""
                          disabled={isLoading}
                          placeholder={
                            form.watch("emailType") === "reply email"
                              ? "Please provide the desired response you would like to include in reply."
                              : "Write an email about..."
                          }
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
                    <FormItem className="space-y-1" id="email-tone">
                      <FormLabel>Tone Of Voice</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-transparent text-gray-800 dark:text-white w-52">
                            <SelectValue placeholder="Select a tone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[15rem] overflow-y-auto">
                          {emailTones.map((tone) => (
                            <SelectItem key={tone} value={tone}>
                              {tone}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <div className="py-4 flex gap-4">
                  <Button
                    className=""
                    type="button"
                    disabled={isLoading}
                    variant="ghost"
                    onClick={() => {
                      setEmail("");
                      form.reset();
                    }}
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
                <DotWave size={47} speed={1} color="rgb(14 165 233)" />
              </div>
            ) : (
              email && (
                <>
                  <h3 className="text-xl md:text-2xl font-semibold ml-4 mb-2 ">
                    Generated Email :
                  </h3>
                  <div className="p-4 md:p-6 lg:p-8 border rounded-lg relative">
                    <div className="absolute right-6 top-6">
                      <CopyToClipboard text={email} />
                    </div>
                    <ReactMarkdown className="prose max-w-full dark:prose-invert">
                      {email}
                    </ReactMarkdown>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailGenerator;
