"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../style.css'

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export const LandingNavbar = () => {
  const { status } = useSession();
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeMenuOnResize = () => {
      if (window.innerWidth >= 640) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', closeMenuOnResize);
    return () => {
      window.removeEventListener('resize', closeMenuOnResize);
    };
  }, []);

  return (
    <div className="p-4 bg-transparent w-full lg:max-w-7xl mx-auto flex items-center justify-between top-0">
      <div className="w-full mx-auto flex items-center justify-between">
        <Link href="/" className="">
          <Image
            className="h-16 w-auto"
            src="/BharatGPTLogo.png"
            height={200}
            width={300}
            alt="logo"
          />
        </Link>

        <div className="lg:hidden cursor-pointer" onClick={() => setMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>

        <nav className={`lg:flex items-center navbar-margin-bg-color bg-white gap-x-2 space-x-4 mt-0 sm:mt-3 ${isMenuOpen ? 'flex flex-col absolute top-20 left-0 right-0 p-4' : 'hidden'}`}>
          <Link href="/">
            <div className="hover:text-custom-orange cursor-pointer text-custom-orange font-bold">Home</div>
          </Link>
          <Link href="/about-us">
            <div className="hover:text-custom-orange cursor-pointer font-bold">About Us</div>
          </Link>
          <Link href="/contact-us">
            <div className="hover:text-custom-orange cursor-pointer font-bold">Contact Us</div>
          </Link>
          <Link href={status === "authenticated" ? "/dashboard" : "/sign-in"}>
            <Button variant="outline" className="rounded-full navbar-button-color border-none my-2">
              Dashboard
            </Button>
          </Link>
        </nav>
      </div>
    </div>
  );
};
