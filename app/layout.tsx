import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import { ModalProvider } from "@/components/modal-provider";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import Provider from "@/context/Provider";
import { cn } from "@/lib/utils";
import { ToasterProvider } from "@/context/toaster-provider";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: {
    default: "BharatChat",
    template: "%s | BharatChat",
  },
  description: "Discover Limitless Possibilities",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className, orbitron.variable)}>
          <ToasterProvider />
          <ModalProvider />
          <ThemeProvider attribute="class" enableSystem defaultTheme="light">
            {children}
          </ThemeProvider>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-8WB2EMJKYC"
            strategy="afterInteractive"
          ></Script>
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-8WB2EMJKYC');
            `}
          </Script>
        </body>
      </html>
    </Provider>
  );
}
