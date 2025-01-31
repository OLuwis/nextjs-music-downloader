import { Soundcloud } from "soundcloud.ts";
import Song from "@/app/types/song";
import log from "loglevel";

// Returns new instance of Soundcloud API
export function createSoundcloud(): Soundcloud {
	return new Soundcloud();
}

// Returns track data from url
export async function fetchTrackData(_url: string, _soundcloud?: Soundcloud): Promise<Song | null> {
	const soundcloud = _soundcloud ?? createSoundcloud();

	const url = _url;

	const info = await soundcloud.tracks.get(url).catch((err) => {
		log.error(`fetchTrackDataError${err}`);
		return null;
	});

	if (!info) return null;

	const author = info.user.username;
	const title = info.title;
	const cover = info.artwork_url.replace(/t500x500|crop|t300x300|large|t67x67|badge|small|tiny|mini/, "original");

	const streamUrl = (await soundcloud.util.streamLink(info, "progressive"));

	return {
		platform: "soundcloud",
		title: title,
		artist: author,
		cover: cover,
		stream: {
			url: streamUrl,
			formats: {
				input: "mp3",
				output: "mp3",
				mime: "audio/mpeg"
			}
		}
	};
}
