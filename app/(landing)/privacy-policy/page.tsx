"use client";

import { Button } from "@/components/ui/button";
import '../style.css'
import Link from "next/link";

const PrivacyPolicy = () => {

    return (
        <div className="mx-auto mt-4 p-4 lg:w-4/5 md:w-9/10">
            <h1 className='custom-style pb-8 text-center'>Privacy Policy
            </h1>
            <p className='text-justify'>
                <ol className="list-decimal pl-4 ">
                    <li className="mb-3">Introduction</li>
                    <p className='mb-3'>we respect your privacy and are committed to protecting your personal information.
                        This Privacy Policy outlines how we collect, use, store, and disclose your information when you use our services,
                        visit our website, or interact with our platform.
                    </p>
                    <li className="mb-3">Information We Collect</li>
                    <p>We may collect the following types of information:</p>
                    <p className='mb-3'>
                        a. Personal Information: This includes your name, email address, phone number, and any other information
                        that you voluntarily provide when creating an account, using our services, or contacting us.
                    </p>

                    <p className='mb-3'>
                        b. Usage Information: We collect data about how you interact with our website and services,
                        including the pages you visit, the features you use, and the duration of your engagement.
                    </p>

                    <p className='mb-3'>
                        c. Cookies and Similar Technologies: We use cookies and similar tracking technologies to gather information
                        about your browsing behavior, preferences, and device information.
                    </p>

                    <li className="mb-3">How We Use Your Information</li>
                    <p className='mb-3'>We use your information to:</p>
                    <p>a. Provide, maintain, and improve our services
                    </p>
                    <p>b. Communicate with you and respond to your inquiries</p>
                    <p className='mb-3'>c. Personalize your user experience and provide tailored content d. Monitor and analyze usage trends to improve our platform e. Ensure the security and integrity of our services</p>

                    <li className="mb-3">Sharing Your Information</li>
                    <p className='mb-3'>We may share your information with third-party service providers who assist us in operating our platform, providing our services, or conducting our business.
                        We may also disclose your information if required by law or in the event of a merger, acquisition, or sale of our assets.
                    </p>
                    <li className="mb-3">Security</li>
                    <p className='mb-3'>We implement a variety of security measures to safeguard your personal information.
                        However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.
                    </p>
                    <li className="mb-3">Third-Party Links</li>
                    <p className='mb-3'>Our website may contain links to third-party websites. We are not responsible for the
                        privacy practices or content of these external sites.
                    </p>
                    <li className="mb-3">Changes to Our Privacy Policy</li>
                    <p className='mb-3'>We reserve the right to update or modify our Privacy Policy at any time. Any changes will be posted on this page,
                        and your continued use of our services constitutes acceptance of those changes.
                    </p>
                    <li className="mb-3">Contact Us</li>
                    <p className='mb-3'>If you have any questions or concerns about our Privacy Policy, please contact us using our website
                    </p>
                </ol>
            </p>
            <div className="flex items-center justify-center space-x-4 my-10">
                <Link href='/sign-up'>
                    <Button className="rounded-full navbar-button-color border-none py-2 px-4 sm:text-xs">
                        I AGREE, LET'S SIGN UP
                    </Button>
                </Link>
                <Link href="/sign-in">
                    <Button className="rounded-full navbar-button-color border-none py-2  px-4 sm:text-xs ">
                        I AGREE, LET'S LOGIN
                    </Button>
                </Link>
            </div>

        </div>
    )
}

export default PrivacyPolicy