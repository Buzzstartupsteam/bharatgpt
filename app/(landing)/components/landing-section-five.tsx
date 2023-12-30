"use client";

import Link from "next/link";
import '../style.css'
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

 const LandingSectionFive = () => {
  const { status } = useSession();

    return (
        <div>
            <h1 className='custom-style pb-4 text-center'>
                Try Bharatgpt.io for Free Today!
            </h1>
            <div className="text-sm md:text-xl text-100 text-center">
                Sign up for a free account today and see how Bharatgpt.io can help you take your
                writing to the next level.
            </div>
            <div className="my-6 flex justify-center">
                <Link
                    href={
                        status == "loading"
                            ? "/"
                            : status == "authenticated"
                                ? "/dashboard"
                                : "/sign-up"
                    }
                >
                    <Button
                        variant="premium"
                        className="md:text-lg p-4 md:p-6 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-500 to-pink-300  font-semibold"
                    >
                        {status === "authenticated" && "Dashboard"}
                        {status == "loading" && "Loading"}
                        {status === "unauthenticated" && "Try now for free"}
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default LandingSectionFive