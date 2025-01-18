import Innertube from "youtubei.js";
import Song from "../types/song";
import { stdout } from "process";

// Return new instance of Youtube API
export function createYoutube(): Promise<Innertube> {
	return Innertube.create();
}

// Return track data from url
export async function fetchTrackData(_url: string, _youtube?: Innertube): Promise<Song> {
	const youtube = _youtube ? _youtube : await createYoutube();

	const url = new URL(_url);
	stdout.write(`url => ${url.toString()}`)

	const id = url.searchParams.get("v") || "";
	stdout.write(`id => ${id}`)

	const info = await youtube.music.getInfo(id);
	stdout.write(`info => ${JSON.stringify(info)}`)

	const author = info.basic_info.author || "";
	const title = info.basic_info.title || "";
	const cover = info.basic_info.thumbnail ? info.basic_info.thumbnail[0].url : "";
	stdout.write(`author => ${author}`)
	stdout.write(`title => ${title}`)
	stdout.write(`cover => ${cover}`)

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
