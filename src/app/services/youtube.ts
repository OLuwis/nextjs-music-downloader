import Innertube from "youtubei.js";
import { Log } from "youtubei.js"
import Song from "../types/song";
import { stdout } from "process";

// Return new instance of Youtube API
export function createYoutube(): Promise<Innertube> {
	return Innertube.create();
}

// Return track data from url
export async function fetchTrackData(_url: string, _youtube?: Innertube): Promise<Song> {
	stdout.write("Step 1")
	const youtube = _youtube ? _youtube : await createYoutube();

	stdout.write("Step 2")
	const url = new URL(_url);

	stdout.write("Step 3")
	const id = url.searchParams.get("v") || "";

	stdout.write("Step 4")
	const info = await youtube.music.getInfo(id);

	stdout.write("Step 5")
	const author = info.basic_info.author || "";
	const title = info.basic_info.title || "";
	const cover = info.basic_info.thumbnail ? info.basic_info.thumbnail[0].url : "";

	stdout.write(JSON.stringify(info))
	stdout.write("Step 6")
	const streamUrl = info.chooseFormat({ type: "video+audio" }).decipher(youtube.session.player);

	stdout.write("Step 7")
	return {
		platform: "youtube music",
		title: title,
		artist: author,
		cover: cover,
		stream: {
			url: streamUrl,
			formats: {
				input: "mp4",
				output: "m4a",
				mime: "audio/mp4"
			}
		}
	}
}
