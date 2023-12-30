import React from "react";
import SignIn from "./SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = () => {
  return <SignIn />;
};

export default SignInPage;
