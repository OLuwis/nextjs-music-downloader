import Innertube from "youtubei.js";
import Song from "../types/song";
import { stdout } from "process";

// Return new instance of Youtube API
export function createYoutube(_visitorData?: string): Promise<Innertube> {
	const visitorData = _visitorData ?? "";

	return Innertube.create({ visitor_data: visitorData });
}

// Return track data from url
export async function fetchTrackData(_url: string, _youtube?: Innertube): Promise<Song> {
	const res = await fetch("https://music.youtube.com", {
		headers: {
			"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"
		}
	})

	const page = await res.text();

	stdout.write(page);

	const firstIndex = page.indexOf("visitorData");
	const secondIndex = page.indexOf("userAgent", firstIndex);

	const visitorData = page.substring(firstIndex + "visitorData\":\"".length, secondIndex - "\",\"".length);

	stdout.write(visitorData);

	const youtube = _youtube ?? await createYoutube(visitorData);

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

/* export async function authenticate(_youtube?: Innertube): Promise<Innertube> {
	const youtube = _youtube ?? await createYoutube();

	await youtube.session.signIn();

	return youtube;
} */
