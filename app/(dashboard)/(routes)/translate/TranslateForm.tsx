"use client";
import CopyToClipboard from "@/components/copy-to-clipboard";
import { ProModal } from "@/components/pro-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { languagesList } from "@/constants";
import { useProModal } from "@/hooks/use-pro-modal";
import { useTranslate } from "@/hooks/useTranslate";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, MoveDown, MoveUp } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

const languages = languagesList.map(({ name }) => name);

const formSchema = z.object({
  text: z.string().min(2),
  language: z.string(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const TranslateForm = () => {
  const { setText, text } = useTranslate();
  const proModal = useProModal();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormSchemaType>({
    defaultValues: {
      text: "",
      language: "English",
    },
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const onSubmit = async (values: FormSchemaType) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/translate", {
        text: values.text,
        target_language: languagesList.filter(
          ({ code, name }) => name == values.language
        )[0].code,
      });

      setText(data);
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error(error?.response?.data);
      }
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-2xl"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Type text to translate"
                    minRows={5}
                    maxRows={5}
                    rows={5}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Language</FormLabel>
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
                      {languages.map((language) => (
                        <SelectItem key={language} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="" type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin mr-2 h5 w-4" />}
              Translate
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Textarea
              readOnly
              minRows={5}
              maxRows={5}
              rows={5}
              className="resize-none"
              placeholder="Translation"
              value={text}
            />
            {text && (
              <CopyToClipboard
                className="absolute bottom-2 right-2"
                text={text}
              />
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default TranslateForm;
