"use client";
import TypewriterComponent from "typewriter-effect";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

 const LandingHero = () => {
  const { status } = useSession();

  return (
    <div className="font-bold py-36 text-center space-y-5 bg-1e1e2d text-white" style={{ backgroundColor: '#1e1e2d' }}>
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold font-orbitron">
        <h4>Bharatgpt.io: Your AI-Powered Writing Assistant</h4>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-pink-300 pb-2">
          <TypewriterComponent
            options={{
              strings: [
                "Unlock Your Creativity with Bharatgpt.io",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl text-gray-200 font-light">
        Leverage AI-driven content for blogs, articles, websites, social media, and beyond
      </div>
      <div>
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
      <div className="text-white text-xs md:text-sm font-normal">
        Powered by <span className="font-medium">ZOSAGI</span>
      </div>
    </div>
  );
};

export default LandingHero
