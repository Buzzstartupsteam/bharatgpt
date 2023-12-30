"use client";

import Link from "next/link";
import '../style.css'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

const SocialMediaIcons = () => {
    return (
        <div className="flex mt-3">
            <div className="mr-3">
                <FontAwesomeIcon icon={faInstagram} size="2x" color="#e4405f" />
            </div>
            <div className="mr-3">
                <FontAwesomeIcon icon={faFacebook} size="2x" color="#1877f2" />
            </div>
            <div>
                <FontAwesomeIcon icon={faLinkedin} size="2x" color="#0e76a8" />
            </div>
            <div className="ml-2">
                <FontAwesomeIcon icon={faTwitter} size="2x" color="#1da1f2" />
            </div>
        </div>
    );
};
const LandingFooter = () => {
    const { status } = useSession();

    return (
        <div className="bg-black flex items-center justify-center mt-0">
            <div className="w-full lg:w-4/5 md:w-9/10 text-white p-4">
                <div className="flex flex-wrap justify-between mt-6">
                    <div className="w-full md:w-1/4 lg:w-1/4 mb-4 md:mb-0">
                        <Link href="/">
                            <Image
                                className="h-16 w-auto"
                                src="/BharatGPTLogo.png"
                                height={200}
                                width={300}
                                alt="logo"
                            />
                        </Link>
                        <p className="py-4 text-sm">Bharat Chat is an innovative AI-powered platform designed to streamline your marketing efforts
                            and automate content creation. Our comprehensive solution offers a wide range of text-based services,
                            including email writing, blog composition, ad generation, video script crafting, and more.
                        </p>
                    </div>
                    <div className="w-full md:w-1/6 lg:w-1/6 mb-4 md:mb-0">
                        <p className="font-bold">Information</p>
                        <p className="text-sm pt-2">AI World</p>
                    </div>
                    <div className="w-full md:w-1/6 lg:w-1/6 mb-4 md:mb-0">
                        <p className="font-bold">Site Pages</p>
                        <Link href="/sign-in"><p className="text-sm pt-2">Login</p></Link>
                        <Link href="/sign-up"><p className="text-sm pt-2">Register</p></Link>
                    </div>
                    <div className="w-full md:w-1/6 lg:w-1/6 mb-4 md:mb-0">
                        <p className="font-bold">Company</p>
                        <p className="text-sm pt-2">Terms & Conditions</p>
                        <Link href="privacy-policy"><p className="text-sm pt-2">Privacy policy</p></Link>
                    </div>
                    <div className="w-full md:w-1/4 lg:w-1/5 mb-4 md:mb-0">
                        <p className="font-bold">Social Media</p>
                        <p className="text-sm pt-2">Follow up on social media to find out the latest updates.</p>
                        <SocialMediaIcons />
                        <p className="font-bold mt-3">Get Started Today</p>
                        <Link href={status === "authenticated" ? "/dashboard" : "/sign-up"}>
                            <Button variant="outline" className="rounded-full my-3 navbar-button-color border-none">
                                SIGN UP NOW
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="border-b my-4"></div>

                <div className="flex flex-col md:flex-row justify-between">
                    <div className="w-full md:w-4/5 mb-4 md:mb-0 md:mr-4">&copy; 2023 Your Company <span className="text-custom-orange"> Bharatgpt</span> All rights reserved</div>
                    <div className="w-full md:w-1/4"><Link href="/privacy-policy"><span className=" text-custom-orange">Privacy Policy</span></Link> | <span className="text-custom-orange">Terms & Conditions</span></div>
                </div>
            </div>
        </div>
    )
}

export default LandingFooter