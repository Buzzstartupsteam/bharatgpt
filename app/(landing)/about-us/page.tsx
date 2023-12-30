"use client";

import '../style.css'
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

const AboutUs = () => {

    const { status } = useSession();

    return (
        <div className="mx-auto lg:w-3/4 sm:w-90 sm:p-4">
            <h1 className='custom-style pb-8 text-center'>About Us
            </h1>
            <div className="flex flex-wrap mb-8">
                <div className="w-full lg:w-1/2 mb-4 lg:mb-12 pr-0 lg:pr-4 rounded-md mx-4 sm:mx-0">
                    <img src="/AboutUs.jpg" alt="Your Image" className="w-full h-auto rounded" />
                </div>
                <div className="w-full lg:w-1/2 lg:pl-4 mb-8 lg:mb-0  mx-4 sm:mx-0">
                    <div>
                        <h3 className="text-2xl font-bold mb-2 lg:mb-4 text-custom-orange">Bharatgpt.io: Your AI-Powered Writing Companion</h3>
                        <p>
                            Revolutionize your writing journey with Bharatgpt.io, the AI-powered tool designed for authors at any level. Craft compelling content effortlessly with our intuitive interface, supported by advanced grammar and spell checking. Elevate your writing with style suggestions and transcend linguistic barriers through seamless translation. Whether you're a seasoned writer or just starting, Bharatgpt.io empowers you to share your stories with a global audience. Unleash your creativity, connect worldwide, and let AI amplify your writing proficiency with Bharatgpt.io.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap mb-8">
                <div className="w-full lg:w-1/2 lg:pl-4 mb-8 lg:mb-0  mx-4 sm:mx-0">
                    <div>
                        <h3 className="text-2xl font-bold mb-2 lg:mb-4 text-custom-orange">Bharatgpt.io: Empower Your Developers with Our Powerful API</h3>
                        <p className='mb-3'>
                            Unlock the full potential of Bharatgpt.io's AI-powered writing capabilities by
                            integrating our seamless API into your applications and services. Our API grants
                            developers access to a suite of advanced features, enabling you to:
                        </p>
                        <ul className="list-disc lg:pl-4">
                            <li>Incorporate AI-powered writing assistance directly into your applications</li>
                            <li>Automate content creation tasks</li>
                            <li>Enhance user engagement and productivity</li>
                            <li>Streamline workflows and reduce development time</li>
                        </ul>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 mb-4 lg:mb-12 pr-0 lg:pr-4 rounded-md mx-4 sm:mx-0">
                    <img src="/AboutusDeveloper.jpg" alt="Your Image" className="w-full h-auto rounded" />
                </div>
            </div>
            <div className="flex flex-wrap mb-8">
                <div className="w-full lg:w-1/2 mb-4 lg:mb-12 pr-0 lg:pr-4 rounded-md mx-4 sm:mx-0">
                    <img src="/ApiFeatures.jpg" alt="Your Image" className="w-full h-auto rounded" />
                </div>
                <div className="w-full lg:w-1/2 lg:pl-4 mb-8 lg:mb-0  mx-4 sm:mx-0">
                    <div>
                        <h3 className="text-2xl font-bold mb-2 lg:mb-4 text-custom-orange">Key API Features</h3>
                        <p>
                            Revolutionize your writing journey with Bharatgpt.io, the AI-powered tool designed for authors at any level. Craft compelling content effortlessly with our intuitive interface, supported by advanced grammar and spell checking. Elevate your writing with style suggestions and transcend linguistic barriers through seamless translation. Whether you're a seasoned writer or just starting, Bharatgpt.io empowers you to share your stories with a global audience. Unleash your creativity, connect worldwide, and let AI amplify your writing proficiency with Bharatgpt.io.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap mb-8">
                <div className="w-full lg:w-1/2 lg:pl-4 mb-8 lg:mb-0  mx-4 sm:mx-0">
                    <div>
                        <h3 className="text-2xl font-bold mb-2 lg:mb-4 text-custom-orange">Benefits of Integrating Bharatgpt.io's API</h3>
                        <ul className="list-disc lg:pl-4">
                            <li>Boost developer productivity</li>
                            <li>Enhance application features and functionality</li>
                            <li>Expand your user base and market reach</li>
                            <li>Gain a competitive edge in the market</li>
                        </ul>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 mb-4 lg:mb-12 pr-0 lg:pr-4 rounded-md mx-4 sm:mx-0">
                    <img src="/Benefits.jpg" alt="Your Image" className="w-full h-auto rounded" />
                </div>
            </div>

            <div className="flex flex-wrap mb-8">
                <div className="w-full lg:w-1/2 mb-4 lg:mb-12 pr-0 lg:pr-4 rounded-md mx-4 sm:mx-0">
                    <img src="/Collaborate.jpg" alt="Your Image" className="w-full h-auto rounded" />
                </div>
                <div className="w-full lg:w-1/2 lg:pl-4 mb-8 lg:mb-0  mx-4 sm:mx-0">
                    <div>
                        <h3 className="text-2xl font-bold mb-2 lg:mb-4 text-custom-orange">Partner with Bharatgpt.io to Empower Your Developers</h3>
                        <p>
                            Join our growing community of developers and revolutionize the way your users
                            interact with AI-powered writing assistance. Our API documentation, support
                            resources, and dedicated team are here to guide you through the integration process
                            and ensure a seamless experience.
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <h1 className='custom-style pb-4 text-center'>
                    Embark on Your AI-Powered Development Journey Today
                </h1>
                <div className="text-sm md:text-xl text-100 text-center">
                    Sign up to learn more about integrating Bharatgpt.io's API into your applications
                    and unlock the limitless possibilities of AI-powered writing.
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

        </div>
    )
}

export default AboutUs