"use client";

import Image from "next/image";

 const LandingSectionSecond = () => {
    return (
        <div className="py-10">
            <div className="text-sm md:text-xl text-200 custom-style text-center">
                BharatGPT Advantages
            </div>

            <div className="container mx-auto flex flex-col py-6 md:flex-row md:space-x-8">
                <div className="w-full md:w-2/5 mb-4 md:mb-0">
                    <div className="bg-white mb-8 p-6 rounded shadow-md">
                        <Image src="/CuttingEdgeTechnology.png" height={70} width={90} alt="" />
                        <div className="text-sm md:text-xl text-custom-orange py-2 text-200 custom-style text-start">
                            Cutting-Edge AI Technology
                        </div>
                        <p className="mt-0 text-justify">Experience unparalleled content generation using advanced AI technology, designed
                            to meet your diverse needs with precision and accuracy.</p>
                    </div>
                    <div className="bg-white p-6 mb-8 rounded shadow-md">
                        <Image src="/EffortlessTextEditing.png" height={53} width={61} alt="" />
                        <div className="text-sm md:text-xl text-custom-orange py-2 text-200 custom-style text-start">
                            Effortless AI Text Editing
                        </div>
                        <p className="mt-0 text-justify">Easily customize and refine AI-generated content to suit your brand's voice and
                            style, ensuring a seamless integration with your existing messaging.</p>
                    </div>
                    <div className="bg-white mb-8 p-6 rounded shadow-md">
                        <Image src="/CreateAIpoweredImages.png" height={53} width={61} alt="" />
                        <div className="text-sm md:text-xl text-custom-orange py-2 text-200 custom-style text-start">
                            Create AI-Powered Images with Text
                        </div>
                        <p className="mt-0 text-justify">Transform your text into stunning visuals using AI-generated images, enhancing the
                            impact and engagement of your content across multiple platforms.</p>
                    </div>
                </div>

                <div className="w-full md:w-2/5 mb-4 md:mb-0">
                    <div className="bg-white mb-8 p-6 rounded shadow-md">
                        <Image src="/SupportLanguages.png" height={70} width={90} alt="" />
                        <div className="text-sm md:text-xl text-custom-orange py-2 text-200 custom-style text-start">
                            Support for 25+ Languages
                        </div>
                        <p className="mt-0 text-justify">Expand your reach with AI-generated content in over 25 languages, catering to a
                            global audience and boosting your business's international presence.</p>
                    </div>

                    <div className="bg-white mb-8 p-6 rounded shadow-md">
                        <Image src="/EnhancedFA.png" height={53} width={61} alt="" />
                        <div className="text-sm md:text-xl text-custom-orange py-2 text-200 custom-style text-start">
                            Enhanced 2FA Account Security
                        </div>
                        <p className="mt-0 text-justify">Protect your account and sensitive information with robust two-factor authentication
                            (2FA) that ensures your data remains secure and confidential.</p>
                    </div>

                </div>

                <div className="w-full md:w-1/3">
                    <div className="bg-white px-6 pt-0 lg:pt-36 rounded">
                        <h2 className="text-2xl font-bold mb-4"><span className="text-custom-orange"> BharatGPT:</span> Unleashing AI-Driven Content Mastery</h2>
                        <p className="py-2">
                            Unlock the potential of BharatGPT's advanced AI technology to elevate your content
                            creation process. Streamline your workflow with impressive efficiency and accuracy,
                            boosting your brand's impact and appeal.</p>
                        <p>
                            Leverage the power of BharatGPT's AI engine to supercharge your marketing and
                            communication campaigns. Experience the ease of crafting compelling content that
                            captivates your audience, setting your brand apart in a competitive digital landscape.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingSectionSecond