"use client";

import { Title, Subtitle, Input, ButtonSolid, ButtonWhite, Chip } from "@/app/components";
import { LoaderIcon, ArrowRightIcon, GithubIcon, SunIcon, MoonIcon, SoundCloud, YoutubeMusic } from "@/app/icons";
import { useState } from "react";
import { useTheme } from "next-themes";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
        <div className="text-center">
          <a href=".">
            <Title text="Music Downloader" />
          </a>
          <div>
            <Subtitle text="Currently supported websites:" />
            <div className="mt-4 mb-3 flex flex-row justify-center gap-x-2" >
              <Chip text="SoundCloud" icon={<SoundCloud className="size-4 fill-white" />} className="bg-orange-600 text-white" />
              <Chip text="Youtube Music (in progress...)" icon={<YoutubeMusic className="size-4 fill-white" />} className="bg-red-600 text-white" />
            </div>
          </div>
          <div className="mt-2 sm:mt-3 mx-auto max-w-xl relative">
            <form action="/song" method="GET" className="relative z-10 flex gap-x-3 p-3" onSubmit={() => setIsLoading(true)} >
              <Input type="url" name="url" value={inputValue} placeholder="Paste your track url here." onChange={(e) => setInputValue(e.target.value)} />
              <div>
                <ButtonSolid leftIcon={
                  isLoading ?
                    <LoaderIcon className="animate-spin" />
                    :
                    <ArrowRightIcon />
                } />
              </div>
            </form>
            <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-12">
              <svg className="w-16 h-auto text-orange-500" width="121" height="135" viewBox="0 0 121 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                <path d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                <path d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
              </svg>
            </div>
            <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-36">
              <svg className="w-40 h-auto text-cyan-500" width="347" height="188" viewBox="0 0 347 188" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="mt-2 sm:mt-3">
            {
              theme === "dark" ?
                <ButtonWhite size="sm" leftIcon={<MoonIcon className="size-4" />} text="Dark Mode" onClick={() => setTheme("light")}
                />
                :
                <ButtonWhite size="sm" leftIcon={<SunIcon className="size-4" />} text="Light Mode" onClick={() => setTheme("dark")} />
            }
            <ButtonWhite size="sm" leftIcon={<GithubIcon className="size-4" />} text="Github" isLink href="https://github.com/OLuwis/nextjs-music-downloader" />
          </div>
        </div>
      </div>
    </div>
  );
}
