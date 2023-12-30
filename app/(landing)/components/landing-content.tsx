"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const templates = [
  {
    imageTemplate: "/BlogTitle.png",
    title: "Blog Titles",
    description: "Nobody wants to read boring blog titles, generate catchy blog titles with this tool",
  },
  {
    imageTemplate: "/BlogSection.png",
    title: "Blog Section",
    description: "Write a full blog section (few paragraphs) about a subheading of your article",
  },
  {
    imageTemplate: "/BlogIntro.png",
    title: "Blog Intros",
    description: "Write an intro that will entice your visitors to read more about your article",
  },
  {
    imageTemplate: "/BlogConclusion.png",
    title: "Blog Conclusion",
    description: "End your blog articles with an engaging conclusion paragraph",
  },
  {
    imageTemplate: "/Welcome Email.png",
    title: "Welcome Email",
    description: "Create welcome emails for your customers",
  },
  {
    imageTemplate: "/Cold Email.png",
    title: "Cold Email",
    description: "Create professional cold emails with the help of AI",
  },
  {
    imageTemplate: "/Follow Up Email.png",
    title: "Follow-Up Email",
    description: "Create professional email follow up with just few clicks",
  },
  {
    imageTemplate: "/Amazon Product Description.png",
    title: "Amazon Product Description",
    description: "Create attention grabbing amazon product description",
  },
  {
    imageTemplate: "/Facebook Ads.png",
    title: "Facebook Ads",
    description: "Boost your brand's reach and engagement with highly targeted and compelling Facebook ad copy, designed to captivate your audience and drive conversions",
  },
  {
    imageTemplate: "/Instagram Caption.png",
    title: "Instagram Captions",
    description: "Grab attention with catchy captions for your Instagram posts",
  },
  {
    imageTemplate: "/Instagram Caption.png",
    title: "Instagram Hashtags Generator",
    description: "Find the best hashtags to use for your Instagram posts",
  },
  {
    imageTemplate: "/Social Media Post(Personal).png",
    title: "Social Media Post (Personal)",
    description: "Write a social media post for yourself to be published on any platform",
  },
  {
    imageTemplate: "/Social Media Post(Business).png",
    title: "Social Media Post (Business)",
    description: "Write a post for your business to be published on any social media platform",
  },
  {
    imageTemplate: "/Facebook Headlines.png",
    title: "Facebook Headlines",
    description: "Write catchy and convincing headlines to make your Facebook Ads stand out",
  },
  {
    imageTemplate: "/Google Ads Headline.png",
    title: "Google Ads Headlines",
    description: "Write catchy 30-character headlines to promote your product with Google Ads",
  },
  {
    imageTemplate: "/Google Ads Description.png",
    title: "Google Ads Description",
    description: "Write a Google Ads description that makes your ad stand out and generates leads",
  },
  {
    imageTemplate: "/Article Generator.png",
    title: "Article Generator",
    description: "Turn a title and outline text into a fully complete high quality article within seconds",
  },
  {
    imageTemplate: "/Content Rewriter.png",
    title: "Content Rewriter",
    description: "Take a piece of content and rewrite it to make it more interesting, creative, and engaging",
  },
  {
    imageTemplate: "/Paragraph Generator.png",
    title: "Paragraph Generator",
    description: "Generate paragraphs about any topic including a keyword and in a specific tone of voice",
  },
  {
    imageTemplate: "/Talking Points.png",
    title: "Talking Points",
    description: "Write short, simple and informative points for the subheadings of your article",
  },
  {
    imageTemplate: "/Pros&Cons.png",
    title: "Pros & Cons",
    description: "Write the pros and cons of a product, service or website for your blog article",
  },
  {
    imageTemplate: "/Summarize Text.png",
    title: "Summarize Text",
    description: "Summmarize any text in a short and easy to understand concise way",
  },
  {
    imageTemplate: "/Product Description.png",
    title: "Product Description",
    description: "Write the description about your product and why it worth it",
  },
  {
    imageTemplate: "/Startup Name Generator.png",
    title: "Startup Name Generator",
    description: "Generate cool, creative, and catchy names for your startup in seconds",
  },
  {
    imageTemplate: "/Product Name Generator.png",
    title: "Product Name Generator",
    description: "Create creative product names from examples words",
  },
  {
    imageTemplate: "/Academic Essay.png",
    title: "Academic Essay",
    description: "Create creative academic essays for various subjects just in a second",
  },
  {
    imageTemplate: "/Creative Stories.png",
    title: "Creative Stories",
    description: "Allow AI to generate creative stories for you based on input text",
  },
  {
    imageTemplate: "/Grammer Check.png",
    title: "Grammar Checker",
    description: "Make sure that there are no errors in your content",
  },
  {
    imageTemplate: "/Summarize Text.png",
    title: "Summarize for 2nd Grader",
    description: "Summarize any complex content for a 2nd grader child",
  },
  {
    imageTemplate: "/Video Description.png",
    title: "Video Descriptions",
    description: "Write compelling YouTube descriptions to get people interested in your video",
  },
  {
    imageTemplate: "/Video Titles.png",
    title: "Video Titles",
    description: "Write a compelling YouTube video title to catch everyones attention",
  },
  {
    imageTemplate: "/youtube Tags.png",
    title: "Youtube Tags Generator",
    description: "Generate SEO-optimized YouTube tags / keywords for your video",
  },
  {
    imageTemplate: "/Video Script.png",
    title: "Video Scripts",
    description: "Quickly create scripts for your videos and start shooting",
  },
  {
    imageTemplate: "/Metadata.png",
    title: "Meta Description",
    description: "Write SEO-optimized meta description based on a description",
  },
  {
    imageTemplate: "/BlogTitle.png",
    title: "FAQs",
    description: "Generate frequently asked questions based on your product description",
  },
  {
    imageTemplate: "/BlogTitle.png",
    title: "FAQ Answers",
    description: "Generate creative answers to questions (FAQs) about your business or website",
  },
  {
    imageTemplate: "/Testimonial.png",
    title: "Testimonials / Reviews",
    description: "Add social proof to your website by generating user testimonials",
  },
  {
    imageTemplate: "/BlogTitle.png",
    title: "Problem-Agitate-Solution",
    description: "Generate one of most effective copywriting formula for your business",
  }
];

const LandingContent = () => {
  return (
    <div>
      <div className="text-sm md:text-xl text-200 custom-style text-center">
        BharatGPT Templates
      </div>

      <div className="text-sm md:text-xl text-100 text-center">
        AAI-driven content creation with diverse templates to inspire success.
      </div>

      <div className="mx-auto w-full lg:w-4/5 flex flex-wrap md:p-8">
      {templates.map((item,index) => (
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4 md:mb-0" key={index}>
          <div className="mb-9 rounded-xl py-4 px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9">
            <div className="mx-auto mb-2 inline-block">
              <Image src={item.imageTemplate} height={53} width={60} alt="Image" className="w-1/2 h-auto rounded-md mx-auto" />
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold text-custom-orange sm:text-2xl lg:text-xl xl:text-2xl">{item.title}
              </h3>
              <p className="text-base font-medium text-body-color">{item.description}</p>
            </div>
          </div>
        </div>))}
      </div>
    </div>
  )
}

export default LandingContent