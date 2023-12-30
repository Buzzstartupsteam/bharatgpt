"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export const SignUp = () => {
  const router = useRouter();
  const [isGoogleClicked, setIsGoogleClicked] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { mutate: register, isLoading } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const { data } = await axios.post("/api/register", values);
      return data;
    },
    async onSuccess(data, { email, password }) {
      router.push(`/verify?email=${email}`);
    },
    onError(error: any) {
      toast.error(error?.response.data || error.message);
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    register(values);
  }

  // useEffect(() => {
  //   if (callbackUrl) {
  //     window.location.href = "/dashboard";
  //   }
  // });

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-orbitron">
          Create an account
        </CardTitle>
        <CardDescription>
          Enter your email below to create your account
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
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="example@gmail.com"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1 mt-4">
                  <FormLabel>Password</FormLabel>

                  <div className="relative">
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute top-2.5 right-2.5 text-muted-foreground"
                      onClick={() => setIsPasswordVisible((ipv) => !ipv)}
                    >
                      {isPasswordVisible ? (
                        <EyeOff strokeWidth={1.5} size={20} />
                      ) : (
                        <Eye strokeWidth={1.5} size={20} />
                      )}
                    </button>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-4" type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          disabled={isLoading || isGoogleClicked}
          onClick={() => {
            setIsGoogleClicked(true);
            signIn("google", { callbackUrl: "/dashboard" });
          }}
        >
          {isGoogleClicked ? (
            <Loader2 size={20} className="mr-4 animate-spin" />
          ) : (
            <FcGoogle size={20} className="mr-4" />
          )}
          Sign Up With Google
        </Button>
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

export default SignUp;
