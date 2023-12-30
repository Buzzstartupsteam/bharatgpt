"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Github, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export const SignIn = () => {
  const searchParams = useSearchParams();
  const [isGoogleClicked, setIsGoogleClicked] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const res = await signIn("credentials", {
      ...values,
      callbackUrl: "/dashboard",
      redirect: false,
    });
    setIsLoading(false);
    if (res?.error) {
      toast.error(res.error);
      return;
    }
    router.push("/dashboard");
  }

  useEffect(() => {
    const error = searchParams?.get("error");
    error && toast.error(error);
    console.log(error);
  }, [searchParams]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-orbitron">Login</CardTitle>
        <CardDescription>
          Enter your email and password below to login your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* {isPhone || (
          <> */}

        {/* </>
        )} */}
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
                      disabled={isLoading || isGoogleClicked}
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
                  <div className="flex justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      className=" text-xs capitalize text-muted-foreground hover:text-primary/80 transition-colors font-medium"
                      href="/reset-password"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <FormControl>
                      <Input
                        disabled={isLoading || isGoogleClicked}
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
            <Button
              className="w-full mt-4"
              type="submit"
              disabled={isLoading || isGoogleClicked}
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "Login"
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
          disabled={isGoogleClicked || isLoading}
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
          Sign In With Google
        </Button>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account ?{" "}
          <Link className="text-sky-500 font-medium" href="/sign-up">
            Sign Up
          </Link>
        </div>
        <Link
          className="text-sm capitalize text-muted-foreground hover:text-primary/80 transition-colors font-medium"
          href="/verify"
        >
          Missing verification email?
        </Link>
      </CardContent>
    </Card>
  );
};

export default SignIn;
