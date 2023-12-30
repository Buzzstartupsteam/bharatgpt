/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "googleusercontent.com",
      "oaidalleapiprodscus.blob.core.windows.net",
      "cdn.openai.com",
      "bt-assets-secure.s3.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
