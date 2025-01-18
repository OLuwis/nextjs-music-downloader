import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PrelineScript from "@/app/components/common/PrelineScript";
import "@/app/globals.css";
import { ThemeProvider } from "next-themes";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-neutral-100 dark:bg-neutral-950`}
      >
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
        <PrelineScript />
      </body>
    </html>
  );
}
