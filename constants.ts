import {
  Code,
  Image,
  ImageIcon,
  Mail,
  MessageSquare,
  Music,
  PenLine,
  RefreshCcw,
  VideoIcon,
  Wand2,
} from "lucide-react";
import { nanoid } from "nanoid";

export const MAX_FREE_COUNTS = 10;

export const conversationId = nanoid();

export const imageGenerationsByPlan: { [key: string]: number } = {
  KICK_OFF_KIT: 100,
  PRIME_TIER_KIT: 300,
  TOP_NOTCH_KIT: 500,
  APP_CHAT: 0,
};

export const imagePrompts = [
  "A serene moonlit forest with fireflies dancing among the trees.",
  "An ancient, moss-covered stone bridge over a crystal-clear river.",
  "A bustling, colorful marketplace in a Moroccan desert oasis.",
  "A majestic dragon soaring through a vibrant, star-studded sky.",
  "A cozy, book-filled library tucked away in a hidden castle tower.",
  "A tranquil beach at sunset, with waves gently lapping the shore.",
  "A futuristic cityscape with holographic skyscrapers and flying cars.",
  "A mystical underwater world with bioluminescent sea creatures.",
  "A magical forest glen where fairies gather beneath a shimmering waterfall.",
  "A steampunk-inspired airship floating above a sprawling steampunk city.",
  "An enchanted, overgrown garden with talking animals and whimsical flowers.",
  "A surreal desert landscape with floating islands and neon cacti.",
  "A grand, gothic cathedral bathed in the soft glow of candlelight.",
  "A cosmic voyage through a wormhole, filled with vibrant cosmic colors.",
  "A peaceful, Japanese cherry blossom garden in full bloom.",
  "A whimsical, candy-coated wonderland with oversized sweets.",
  "A futuristic underwater city with glass domes and aquatic transportation.",
  "A mystical forest with glowing mushrooms and ethereal forest spirits.",
  "A picturesque medieval village nestled in a valley surrounded by mountains.",
  "A magical, enchanted castle in the clouds with floating islands.",
];

export const tools = [
  {
    label: "Bharat Chat",
    icon: MessageSquare,
    href: `/conversation`,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Image Generation",
    icon: Image,
    href: `/image-generation`,
    color: "text-pink-600",
    bgColor: "bg-pink-600/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
  },
  {
    label: "Content Writer",
    icon: Wand2,
    href: "/content-writer",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Translate",
    icon: RefreshCcw,
    href: "/translate",
    color: "text-custom-orange",
    bgColor: "bg-blue-500/10",
  },
  {
    label: "Email Generator",
    icon: Mail,
    href: "/email-generator",
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
  },
  {
    label: "Essay Writer",
    icon: PenLine,
    href: "/essay-writer",
    color: "text-indigo-600",
    bgColor: "bg-indigo-600/10",
  },
];

export const essayTypes = [
  "Narrative",
  "Descriptive",
  "Expository",
  "Defination",

  "Process",
  "Compare",
  "Contrast",
  "Argumentative",
  "Persuasive",
];

export const emailTones = [
  "Formal",
  "Bold",
  "Friendly",
  "Urgent",
  "Casual",
  "Professional",
  "Playful",
  "Neutral",
  "Appreciative",
  "Informative",
  "Confidential",
  "Direct",
  "Grateful",
  "Positive",
  "Respectful",
  "Sincere",
  "Encouraging",
  "Humble",
  "Authoritative",
  "Inquisitive",
];

export const moods = [
  "Serious",
  "Informative",
  "Inspirational",
  "Humorous",
  "Persuasive",
  "Conversational",
  "Emotional",
];
export const personalities = [
  "Informative Expert",
  "Conversational Friend",
  "Creative Storyteller",
  "Persuasive Influencer",
  "Humorous Entertainer",
];
export const sentiments = ["Positive", "Negative", "Neutral"];

export const tonesOfVoice = ["Cheeky", "Formal", "Bold", "Pirates"];

export const programmingLanguages = [
  "JavaScript",
  "Python",
  "Java",
  "C",
  "C++",
  "C#",
  "Ruby",
  "Swift",
  "Kotlin",
  "Go",
  "Rust",
  "PHP",
  "TypeScript",
  "HTML",
  "CSS",
  "SQL",
  "Perl",
  "Haskell",
  "Scala",
  "Lua",
  "R",
  "Solidity",
];

export const templates: {
  title: string;
  description: string;
  type:
    | "CONTENT CREATION AND ENHANCEMENT"
    | "BLOGGING AND SOCIAL MEDIA"
    | "ADVERTISING AND MARKETING"
    | "VIDEO CONTENT"
    | "SEO AND WEBSITE OPTIMIZATION";
}[] = [
  {
    title: "Passage Writer",
    description:
      "Craft compelling passages that will engage and captivate your audience.",
    type: "CONTENT CREATION AND ENHANCEMENT",
  },

  {
    title: "Product Description",
    description:
      "Generate captivating product descriptions suitable for websites, emails, and social media platforms.",
    type: "CONTENT CREATION AND ENHANCEMENT",
  },
  {
    title: "Story Writing",
    description:
      "Craft captivating narratives that captivate and enchant your audience with delectable creativity.",
    type: "CONTENT CREATION AND ENHANCEMENT",
  },
  {
    title: "Content Upgrader",
    description:
      "Revitalize a given piece of content by adding captivating elements, originality, and a touch of creativity.",
    type: "CONTENT CREATION AND ENHANCEMENT",
  },
  {
    title: "Sentence Elaborator",
    description:
      "Transform a brief sentence or a small group of words into a more extensive sentence that is original, captivating, and stimulating.",
    type: "CONTENT CREATION AND ENHANCEMENT",
  },
  {
    title: "Caption Writer",
    description: "Create captivating captions for your Instagram content",
    type: "CONTENT CREATION AND ENHANCEMENT",
  },
  {
    title: "Convincing Bullet Points",
    description: "Create captivating captions for your Instagram content",
    type: "CONTENT CREATION AND ENHANCEMENT",
  },
  {
    title: "Funny Marketing Ideas",
    description:
      "Hilarious concept that generates ineffective marketing suggestions. Like launching a marshmallow cannon at billboards.",
    type: "CONTENT CREATION AND ENHANCEMENT",
  },
  {
    title: "Email Subject Writer",
    description:
      "Create captivating email subject lines that entice recipients to open them.",
    type: "CONTENT CREATION AND ENHANCEMENT",
  },
  {
    title: "Blog post topic ideas",
    description:
      "Generate fresh ideas for blog post topics that will captivate readers and achieve high rankings on Google.",
    type: "BLOGGING AND SOCIAL MEDIA",
  },
  {
    title: "Blog Post Abstract",
    description: `Generate lists and outlines for articles, which are most effective for crafting engaging "Listicle" and "How to" style blog posts or articles.`,
    type: "BLOGGING AND SOCIAL MEDIA",
  },
  {
    title: "Blog Intro Passage",
    description: `Unleash your creativity and overcome writer's block by allowing us to compose the introductory paragraph on your behalf.`,
    type: "BLOGGING AND SOCIAL MEDIA",
  },
  {
    title: "Blog Post Conclusion Clause",
    description: `End your blog articles with a captivating concluding clause.`,
    type: "BLOGGING AND SOCIAL MEDIA",
  },
  {
    title: "Short Social Posts",
    description: `Create concise social media posts with a maximum character limit of 140.`,
    type: "BLOGGING AND SOCIAL MEDIA",
  },
  {
    title: "Quora Answers",
    description: `Smart responses to difficult questions.`,
    type: "BLOGGING AND SOCIAL MEDIA",
  },
  {
    title: "Bio for Company",
    description: `Craft an engaging biography that effectively narrates the journey of your organization.`,
    type: "BLOGGING AND SOCIAL MEDIA",
  },
  {
    title: "Creative Bio",
    description: `Craft an engaging and original personal biography that captivates the reader's interest.`,
    type: "BLOGGING AND SOCIAL MEDIA",
  },
  {
    title: "Powerful Title",
    description: `With expertise derived from renowned copywriters, this template guarantees the generation of powerful headlines that drive conversions for your business.`,
    type: "BLOGGING AND SOCIAL MEDIA",
  },
  {
    title: "Website Subtitle",
    description: `Craft engaging and educational subtitle(H2) to enhance your websites and landing pages with a touch of delight.`,
    type: "BLOGGING AND SOCIAL MEDIA",
  },
  {
    title: "Explain to a Child",
    description: `Please rewrite the text in a way that simplifies the content, making it easier to comprehend and read.`,
    type: "BLOGGING AND SOCIAL MEDIA",
  },
  {
    title: "Interactive Questions",
    description: `In order to enhance engagement, encourage your audience with inventive questions.`,
    type: "BLOGGING AND SOCIAL MEDIA",
  },
  {
    title: "Feature into Advantage",
    description: `Transform the features of your product into advantages that motivate action.`,
    type: "ADVERTISING AND MARKETING",
  },
  {
    title: "Facebook Ad Title",
    description: `Create attention-grabbing titles for your Facebook Ads that compel potential customers to click and make a purchase.`,
    type: "ADVERTISING AND MARKETING",
  },
  {
    title: "Primary Text for Facebook Ad",
    description: `Generate compelling content for the "Primary Text" segment of your Facebook advertisements that maximizes conversion rates.`,
    type: "ADVERTISING AND MARKETING",
  },
  {
    title: "Google Ad Title",
    description: `Create high-converting copy for the "Headlines" section of your Google Ads.`,
    type: "ADVERTISING AND MARKETING",
  },
  {
    title: "Google Ad Description",
    description: `Generate compelling and original content for the "Description" section of your Google Ads that effectively drives conversions.`,
    type: "ADVERTISING AND MARKETING",
  },
  {
    title: "Amazon Product Features in bullets",
    description: `Generate concise and original bullet points highlighting the main features and benefits of products for Amazon listings within the "about this item" section.`,
    type: "ADVERTISING AND MARKETING",
  },
  {
    title: "Amazon Product Description",
    description: `Craft captivating product descriptions for Amazon listings. The resulting content is usually presented in paragraph format, although the writing style may differ.`,
    type: "ADVERTISING AND MARKETING",
  },
  {
    title: "Review Reply",
    description: `Create engaging, polished, and enjoyable replies to customer reviews in a professional manner that are unique and free from plagiarism.`,
    type: "ADVERTISING AND MARKETING",
  },
  {
    title: "Marketing Strategies",
    description: `Create engaging, polished, and enjoyable replies to customer reviews in a professional manner that are unique and free from plagiarism.`,
    type: "ADVERTISING AND MARKETING",
  },
  {
    title: "Youtube Video Ideas",
    description: `Generate innovative ideas for video content that will captivate viewers and achieve high rankings on the YouTube platform.`,
    type: "VIDEO CONTENT",
  },
  {
    title: "Youtube Video Script Outline",
    description: `Generate script outlines for your videos, particularly suited for creating "Listicle" and "How to" style content.`,
    type: "VIDEO CONTENT",
  },
  {
    title: "Youtube Video Title",
    description: `Generate captivating, attention-grabbing titles for your YouTube videos that have the potential to achieve high rankings.`,
    type: "VIDEO CONTENT",
  },
  {
    title: "Youtube Video Script Hook and Introduction",
    description: `Produce an engaging video introduction that grabs the attention of your audience and motivates them to watch till the end.`,
    type: "VIDEO CONTENT",
  },
  {
    title: "Youtube Video Description",
    description: `Generate original and engaging descriptions for YouTube videos that are optimized for search engine rankings.`,
    type: "VIDEO CONTENT",
  },
  {
    title: "SEO - Title and Meta Descriptions",
    description: `Create title tags and meta descriptions that are optimized for search engines and will achieve high rankings on Google.`,
    type: "SEO AND WEBSITE OPTIMIZATION",
  },
  {
    title: "SEO - Blog Posts - Title and Meta Descriptions",
    description: `Enhancing Search Engine Optimization (SEO) through the optimization of blog posts, including crafting unique titles and meta descriptions.`,
    type: "SEO AND WEBSITE OPTIMIZATION",
  },
  {
    title: "SEO - Homepage - Title and Meta Descriptions",
    description: `Optimizing your website's homepage for search engines involves enhancing the title and meta descriptions.`,
    type: "SEO AND WEBSITE OPTIMIZATION",
  },
  {
    title: "SEO - Product Page - Title and Meta Descriptions",
    description: `Create title tags and meta descriptions that are optimized for SEO to ensure high rankings on Google for product pages.`,
    type: "SEO AND WEBSITE OPTIMIZATION",
  },
  {
    title: "SEO - Services Pages - Title and Meta Descriptions",
    description: `Create title tags and meta descriptions that are optimized for SEO to improve the ranking of company service pages on Google.`,

    type: "SEO AND WEBSITE OPTIMIZATION",
  },
  {
    title: "Real Estate Listing - Residential",
    description: `Craft engaging and alluring property descriptions that result in swift home sales.`,

    type: "SEO AND WEBSITE OPTIMIZATION",
  },
  {
    title: "USP",
    description: `Craft a compelling and original description that effectively communicates the advantages of your offer.`,

    type: "SEO AND WEBSITE OPTIMIZATION",
  },
];

export const languagesList = [
  {
    name: "Afrikaans",
    code: "af",
  },
  {
    name: "Amharic",
    code: "am",
  },
  {
    name: "Arabic",
    code: "ar",
  },
  {
    name: "Assamese",
    code: "as",
  },
  {
    name: "Azerbaijani",
    code: "az",
  },
  {
    name: "Bashkir",
    code: "ba",
  },
  {
    name: "Bulgarian",
    code: "bg",
  },
  {
    name: "Bengali",
    code: "bn",
  },
  {
    name: "Tibetan",
    code: "bo",
  },
  {
    name: "Bosnian",
    code: "bs",
  },
  {
    name: "Catalan",
    code: "ca",
  },
  {
    name: "Czech",
    code: "cs",
  },
  {
    name: "Welsh",
    code: "cy",
  },
  {
    name: "Danish",
    code: "da",
  },
  {
    name: "German",
    code: "de",
  },
  {
    name: "Lower Sorbian",
    code: "dsb",
  },
  {
    name: "Divehi",
    code: "dv",
  },
  {
    name: "Greek",
    code: "el",
  },
  {
    name: "English",
    code: "en",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "Estonian",
    code: "et",
  },
  {
    name: "Basque",
    code: "eu",
  },
  {
    name: "Persian",
    code: "fa",
  },
  {
    name: "Finnish",
    code: "fi",
  },
  {
    name: "Filipino",
    code: "fil",
  },
  {
    name: "Fijian",
    code: "fj",
  },
  {
    name: "Faroese",
    code: "fo",
  },
  {
    name: "French",
    code: "fr",
  },
  {
    name: "French (Canada)",
    code: "fr-CA",
  },
  {
    name: "Irish",
    code: "ga",
  },
  {
    name: "Galician",
    code: "gl",
  },
  {
    name: "Konkani",
    code: "gom",
  },
  {
    name: "Gujarati",
    code: "gu",
  },
  {
    name: "Hausa",
    code: "ha",
  },
  {
    name: "Hebrew",
    code: "he",
  },
  {
    name: "Hindi",
    code: "hi",
  },
  {
    name: "Croatian",
    code: "hr",
  },
  {
    name: "Upper Sorbian",
    code: "hsb",
  },
  {
    name: "Haitian Creole",
    code: "ht",
  },
  {
    name: "Hungarian",
    code: "hu",
  },
  {
    name: "Armenian",
    code: "hy",
  },
  {
    name: "Indonesian",
    code: "id",
  },
  {
    name: "Igbo",
    code: "ig",
  },
  {
    name: "Inuktitut",
    code: "ikt",
  },
  {
    name: "Icelandic",
    code: "is",
  },
  {
    name: "Italian",
    code: "it",
  },
  {
    name: "Inuktitut (Syllabics)",
    code: "iu",
  },
  {
    name: "Inuktitut (Latin)",
    code: "iu-Latn",
  },
  {
    name: "Japanese",
    code: "ja",
  },
  {
    name: "Georgian",
    code: "ka",
  },
  {
    name: "Kazakh",
    code: "kk",
  },
  {
    name: "Khmer",
    code: "km",
  },
  {
    name: "Kurdish",
    code: "kmr",
  },
  {
    name: "Kannada",
    code: "kn",
  },
  {
    name: "Korean",
    code: "ko",
  },
  {
    name: "Kurdish (Kurmanji)",
    code: "ku",
  },
  {
    name: "Kyrgyz",
    code: "ky",
  },
  {
    name: "Lingala",
    code: "ln",
  },
  {
    name: "Lao",
    code: "lo",
  },
  {
    name: "Lithuanian",
    code: "lt",
  },
  {
    name: "Luga-Katanga",
    code: "lug",
  },
  {
    name: "Latvian",
    code: "lv",
  },
  {
    name: "Literary Chinese",
    code: "lzh",
  },
  {
    name: "Maithili",
    code: "mai",
  },
  {
    name: "Malagasy",
    code: "mg",
  },
  {
    name: "Maori",
    code: "mi",
  },
  {
    name: "Macedonian",
    code: "mk",
  },
  {
    name: "Malayalam",
    code: "ml",
  },
  {
    name: "Mongolian (Cyrillic)",
    code: "mn-Cyrl",
  },
  {
    name: "Mongolian (Traditional Mongolian)",
    code: "mn-Mong",
  },
  {
    name: "Marathi",
    code: "mr",
  },
  {
    name: "Malay",
    code: "ms",
  },
  {
    name: "Maltese",
    code: "mt",
  },
  {
    name: "Hmong Daw",
    code: "mww",
  },
  {
    name: "Burmese",
    code: "my",
  },
  {
    name: "Norwegian Bokmål",
    code: "nb",
  },
  {
    name: "Nepali",
    code: "ne",
  },
  {
    name: "Dutch",
    code: "nl",
  },
  {
    name: "Northern Sotho",
    code: "nso",
  },
  {
    name: "Chichewa",
    code: "nya",
  },
  {
    name: "Oriya",
    code: "or",
  },
  {
    name: "Querétaro Otomi",
    code: "otq",
  },
  {
    name: "Punjabi",
    code: "pa",
  },
  {
    name: "Polish",
    code: "pl",
  },
  {
    name: "Dari",
    code: "prs",
  },
  {
    name: "Pashto",
    code: "ps",
  },
  {
    name: "Portuguese",
    code: "pt",
  },
  {
    name: "Portuguese (Portugal)",
    code: "pt-PT",
  },
  {
    name: "Romanian",
    code: "ro",
  },
  {
    name: "Russian",
    code: "ru",
  },
  {
    name: "Kirundi",
    code: "run",
  },
  {
    name: "Kinyarwanda",
    code: "rw",
  },
  {
    name: "Sindhi",
    code: "sd",
  },
  {
    name: "Sinhala",
    code: "si",
  },
  {
    name: "Slovak",
    code: "sk",
  },
  {
    name: "Slovenian",
    code: "sl",
  },
  {
    name: "Samoan",
    code: "sm",
  },
  {
    name: "Shona",
    code: "sn",
  },
  {
    name: "Somali",
    code: "so",
  },
  {
    name: "Albanian",
    code: "sq",
  },
  {
    name: "Serbian (Cyrillic)",
    code: "sr-Cyrl",
  },
  {
    name: "Serbian (Latin)",
    code: "sr-Latn",
  },
  {
    name: "Sesotho",
    code: "st",
  },
  {
    name: "Swedish",
    code: "sv",
  },
  {
    name: "Swahili",
    code: "sw",
  },
  {
    name: "Tamil",
    code: "ta",
  },
  {
    name: "Telugu",
    code: "te",
  },
  {
    name: "Thai",
    code: "th",
  },
  {
    name: "Tigrinya",
    code: "ti",
  },
  {
    name: "Turkmen",
    code: "tk",
  },
  {
    name: "Klingon (Latin script)",
    code: "tlh-Latn",
  },
  {
    name: "Klingon (pIqaD script)",
    code: "tlh-Piqd",
  },
  {
    name: "Tswana",
    code: "tn",
  },
  {
    name: "Tongan",
    code: "to",
  },
  {
    name: "Turkish",
    code: "tr",
  },
  {
    name: "Tatar",
    code: "tt",
  },
  {
    name: "Tahitian",
    code: "ty",
  },
  {
    name: "Uyghur",
    code: "ug",
  },
  {
    name: "Ukrainian",
    code: "uk",
  },
  {
    name: "Urdu",
    code: "ur",
  },
  {
    name: "Uzbek",
    code: "uz",
  },
  {
    name: "Vietnamese",
    code: "vi",
  },
  {
    name: "Xhosa",
    code: "xh",
  },
  {
    name: "Yoruba",
    code: "yo",
  },
  {
    name: "Yucateco",
    code: "yua",
  },
  {
    name: "Cantonese",
    code: "yue",
  },
  {
    name: "Chinese (Simplified)",
    code: "zh-Hans",
  },
  {
    name: "Chinese (Traditional)",
    code: "zh-Hant",
  },
  {
    name: "Zulu",
    code: "zu",
  },
];
