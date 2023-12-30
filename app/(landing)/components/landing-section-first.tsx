"use client";

import '../style.css'
import Image from 'next/image';

const features = [
    {
        imageName: "/ImageGeneration.png",
        featureHeading: "Image Generation",
        featureContent: "Create stunning visuals and graphics effortlessly with AI -powered image generation tools."
    },
    {
        imageName: "/Summarize.png",
        featureHeading: "Summarize",
        featureContent: "Condense lengthy content into concise and insightful summaries for quick understanding."
    },
    {
        imageName: "/Analyze.png",
        featureHeading: "Analyze",
        featureContent: " Gain valuable insights through in -depth analysis of data, text, or content using advanced AI algorithms."
    },
    {
        imageName: "/Translate.png",
        featureHeading: "Translate",
        featureContent: "Seamlessly translate content between languages with precision and efficiency using AI-driven language translation."
    },
    {
        imageName: "/ContentCreator.png",
        featureHeading: "Content Creator",
        featureContent: "Enhance your creative output with AI assistance, generating engaging and tailored content across various mediums."
    },
    {
        imageName: "/EssayWriter.png",
        featureHeading: "Essay Writer",
        featureContent: "Simplify the writing process with AI - generated essays, providing well - structured and coherent pieces on diverse topics."
    },
    {
        imageName: "/CodeGeneration.png",
        featureHeading: "Code Generation",
        featureContent: "Expedite software development with AI - generated code snippets, ensuring efficiency and accuracy in programming tasks."
    }
]

 const LandingSectionFirst = () => {

    return (
        <div className='pt-10 text-center'>
            <h1 className='custom-style pb-8'>Bharatgpt.io is a revolutionary AI-powered writing assistant that helps you overcome
                writer's block, generate creative content, and improve your writing skills.
            </h1>
            <div className="text-sm md:text-xl text-200 custom-style text-center">
                BharatGPT Key Features
            </div>
            <div className="flex justify-center items-center">
                <div className="w-full md:w-4/5 lg:w-90 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                        {features.map((item, index) => (
                            <div key={index} className="bg-gray-100 flex p-4 rounded-md">
                                <div className="flex items-center">
                                    <Image src={item.imageName} height={120} width={105} alt="Image" className="w-1/2 h-auto rounded-md mx-auto" />
                                </div>
                                <div className="ml-4 flex-grow">
                                    <h2 className="text-xl text-custom-orange sm:text-2xl lg:text-xl xl:text-2xl font-bold mb-2 text-justify">{item.featureHeading}</h2>
                                    <p className="mt-0 text-justify">{item.featureContent}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default LandingSectionFirst
