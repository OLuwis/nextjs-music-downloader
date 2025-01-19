import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import Song from "@/app/types/song";

// Returns new FFmpeg instance
export function createFFmpeg(): FFmpeg {
	return new FFmpeg();
}

// Returns FFmpeg binaries
export async function fetchFFmpegBinaries(_baseURL?: string): Promise<{ coreURL: string, wasmURL: string, workerURL?: string }> {
	const baseURL = _baseURL ?? "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";

	const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript");
	const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm");

	return { coreURL: coreURL, wasmURL: wasmURL };
}

// Fetches FFmpeg file inputs
export async function fetchFFmpegInputs(_data: Song, _ffmpeg?: FFmpeg) {
	const ffmpeg = _ffmpeg ?? createFFmpeg();
	const data = _data;

	const audioFile = await fetchFile(data.stream.url);
	const imageFile = await fetchFile(data.cover);

	await ffmpeg.writeFile(`audio.${data.stream.formats.input}`, audioFile);
	await ffmpeg.writeFile("image.jpg", imageFile);
}

// Process FFmpeg file inputs
export async function processFFmpegInputs(_data: Song, _ffmpeg?: FFmpeg) {
	const ffmpeg = _ffmpeg ?? createFFmpeg();
	const data = _data;

	await ffmpeg.exec(["-y", "-vn", "-i", `audio.${data.stream.formats.input}`, "-i", "image.jpg", "-map", "0", "-map", "1", "-c:0", "copy", "-c:1", "copy", "-disposition:1", "attached_pic", "-metadata", `artist=${data.artist}`, "-metadata", `title=${data.title}`, `${data.artist} - ${data.title}.${data.stream.formats.output}`]);
}

// Fetches FFmpeg file outputs
export async function fetchFFmpegOutputs(_data: Song, _ffmpeg?: FFmpeg): Promise<Blob> {
	const ffmpeg = _ffmpeg ?? createFFmpeg();
	const data = _data;

	const file = await ffmpeg.readFile(`${data.artist} - ${data.title}.${data.stream.formats.output}`) as { buffer: BlobPart };

	return new Blob([file.buffer], { type: data.stream.formats.mime });
}

// Exports FFmpeg file outputs
export function exportFFmpegOutputs(_data: Song, _blob: Blob) {
	const data = _data;
	const blob = _blob;

	const url = URL.createObjectURL(blob);
	const anchor = document.createElement('a');

	anchor.href = url;
	anchor.setAttribute("download", `${data.artist} - ${data.title}.${data.stream.formats.output}`);

	anchor.click();
}
