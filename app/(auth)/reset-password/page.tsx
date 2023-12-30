"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
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
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { generateOTP } from "@/lib/utils";

const otpSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "OTP must be six digit long." })
    .max(6, { message: "OTP must be six digit long." }),
});

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

const ResetPage = () => {
  const router = useRouter();
  const [isSent, setIsSent] = useState(false);
  const [otp, setOtp] = useState(generateOTP());
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });
  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
  });

  // send otp
  const { mutate: sendOtp, isLoading } = useMutation({
    mutationKey: ["send otp"],
    mutationFn: async (email: string) => {
      const { data } = await axios.post("/api/user/reset-otp", { email, otp });
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

  const { mutate: resetPassword, isLoading: verifyLoading } = useMutation({
    mutationKey: ["reset password"],
    mutationFn: async ({ email, password }: z.infer<typeof formSchema>) => {
      const { data } = await axios.post("/api/user/reset-password", {
        email,
        password,
      });
      return data;
    },
    onSuccess(data, email, context) {
      toast.success("Password reset!");
      router.push("/sign-in");
    },

    onError(error: any) {
      toast.error(error.response.data || error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    sendOtp(values.email);
  };

  const onOtpSubmit = (values: z.infer<typeof otpSchema>) => {
    if (values.otp !== otp) {
      toast.error("OTP is incorrect!");
      return;
    }

    resetPassword({
      email: form.getValues("email"),
      password: form.getValues("password"),
      confirmPassword: form.getValues("confirmPassword"),
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-orbitron">
          Reset Your Password
        </CardTitle>
        <CardDescription>
          Enter the email to get OTP to setting up new password.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      {...field}
                      disabled={isSent}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      {...field}
                      type="password"
                      disabled={isSent}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* confirm password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      {...field}
                      type="password"
                      disabled={isSent}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full mt-4"
              type="submit"
              disabled={isLoading || isSent}
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

        <Link className="text-sky-500 text-sm" href="/sign-in">
          Login
        </Link>
      </CardContent>
    </Card>
  );
};

export default ResetPage;
