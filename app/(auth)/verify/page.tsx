"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { generateOTP } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Invalid Email!"),
});

const otpSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "OTP must be six digit long." })
    .max(6, { message: "OTP must be six digit long." }),
});

const VerifyOtp = ({
  searchParams: { email, user, password },
}: {
  searchParams: { email: string; user: string; password: string };
}) => {
  const [otp, setOpt] = useState(generateOTP);
  const router = useRouter();

  const [isSent, setIsSent] = useState(false);
  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
  });
  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: email ?? "" },
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: ["send otp"],
    mutationFn: async (email: string) => {
      const { data } = await axios.post("/api/user/send-otp", { email, otp });
      return data;
    },
    onSuccess(data, variables, context) {
      toast.success("Email Sent!");
      setIsSent(true);
    },
    onError(error, variables, context) {
      toast.error("Failed to send email!");
    },
  });
  const { mutate: verifyEmail, isLoading: verifyLoading } = useMutation({
    mutationKey: ["verify email"],
    mutationFn: async (otp: string) => {
      const { data } = await axios.post("/api/user/verify", { email });
      return data;
    },
    onSuccess(data, variables, context) {
      toast.success("Email Verified!");
      router.push("/sign-in");
    },
    onError(error: any, variables, context) {
      toast.error(error?.response?.data || error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof emailSchema>) => {
    mutate(values.email);
  };

  const onOtpSubmit = (values: z.infer<typeof otpSchema>) => {
    console.log(otp, values.otp);
    if (values.otp !== otp) {
      toast.error("OTP is incorrect!");
      return;
    }
    verifyEmail(values.otp);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-orbitron">Verify OTP</CardTitle>
        <CardDescription>
          Enter OTP below to verify your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      placeholder="johndoe@gmail.com"
                      disabled={isSent}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full"
              type="submit"
              disabled={isSent || isLoading}
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "Send OTP"
              )}
            </Button>
          </form>
        </Form>
        {isSent && (
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(onOtpSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>OTP</FormLabel>
                    <FormControl>
                      <Input className="" placeholder="000 000" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit" disabled={verifyLoading}>
                {verifyLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  "Verify"
                )}
              </Button>
            </form>
          </Form>
        )}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Have an account ?{" "}
          <Link className="text-sky-500 font-medium" href="/sign-in">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerifyOtp;
