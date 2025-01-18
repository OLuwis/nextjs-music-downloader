import Innertube from "youtubei.js";
import { Log } from "youtubei.js"
import Song from "../types/song";

// Return new instance of Youtube API
export function createYoutube(): Promise<Innertube> {
	return Innertube.create();
}

// Return track data from url
export async function fetchTrackData(_url: string, _youtube?: Innertube): Promise<Song> {
	Log.setLevel(Log.Level.DEBUG)

	const youtube = _youtube ? _youtube : await createYoutube();

	const url = new URL(_url);
	const id = url.searchParams.get("v") || "";

	const info = await youtube.music.getInfo(id);

	const author = info.basic_info.author || "";
	const title = info.basic_info.title || "";
	const cover = info.basic_info.thumbnail ? info.basic_info.thumbnail[0].url : "";

	const streamUrl = info.chooseFormat({ type: "video+audio" }).decipher(youtube.session.player);

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
