"use client";

import Song from "@/app/types/song";
import Image from "next/image";
import { DownloadIcon, LoaderIcon } from "@/app/icons";
import { useState } from "react";
import { createFFmpeg, exportFFmpegOutputs, fetchFFmpegBinaries, fetchFFmpegInputs, fetchFFmpegOutputs, processFFmpegInputs } from "@/app/services/ffmpeg";
import log from "loglevel";

export default function SongCard({
	data
}: {
	data: Song;
}) {
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState("Download");

	const startDownload = async () => {
		setIsLoading(true);
		setButtonText("Creating FFmpeg instance...");
		const ffmpeg = createFFmpeg();

		ffmpeg.on("log", ({ message }) => log.debug(`FFmpeg: ${message}`));

		setButtonText("Fetching FFmpeg binaries...");
		const binaries = await fetchFFmpegBinaries();

		setButtonText("Loading FFmpeg binaries...");
		await ffmpeg.load(binaries);

		setButtonText("Fetching input files...");
		await fetchFFmpegInputs(data, ffmpeg);

		setButtonText("Processing input files...");
		await processFFmpegInputs(data, ffmpeg);

		setButtonText("Fetching output files");
		const blob = await fetchFFmpegOutputs(data, ffmpeg);

		setButtonText("Serving output files...");
		exportFFmpegOutputs(data, blob);

		setIsLoading(false);
		setButtonText("Download");
	}

	return (
		<div>
			<div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 max-w-xl mx-auto aspect-square overflow-hidden">
				<div className="flex flex-col justify-center items-center bg-blue-600 rounded-t-xl aspect-square overflow-hidden">
					<Image className="h-full w-full object-cover" src={data.cover} alt="Song Cover" width={500} height={500} />
				</div>
				<div className="p-4 md:p-6">
					<span className={`block mb-1 text-xs md:text-sm font-semibold uppercase ${data.platform === "soundcloud" ? "text-orange-600 dark:text-orange-500" : "text-red-600 dark:text-red-500"}`}>
						{data.platform}
					</span>
					<h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
						{data.title}
					</h3>
					<p className="mt-0.5 md:text-xl text-gray-500 dark:text-neutral-500">
						{data.artist}
					</p>
				</div>
				<div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
					<button className="w-full py-3 sm:py-4 px-4 inline-flex justify-center items-center gap-x-2 text-base md:text-lg font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" onClick={startDownload}>
						{isLoading ? <LoaderIcon className="animate-spin" /> : <DownloadIcon />}
						{buttonText}
					</button>
				</div>
			</div>
		</div>
	);
}
