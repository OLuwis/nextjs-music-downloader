import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PrelineScript from "@/app/components/common/PrelineScript";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Music Downloader",
  description: "Simple and free music downloader.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
        <PrelineScript />
      </body>
    </html>
  );
}
