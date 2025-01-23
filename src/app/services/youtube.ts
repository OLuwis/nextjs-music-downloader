import Innertube from "youtubei.js";
import Song from "../types/song";
import { JSDOM } from "jsdom";
import { stdout } from "process";
import BG, { BgConfig } from "bgutils-js";

// Return new instance of Youtube API
export async function createYoutube(): Promise<Innertube> {
	const innertube = await Innertube.create({ retrieve_player: false });

	const requestKey = "O43z0dpjhgX20SCx4KAo";
	const visitorData = innertube.session.context.client.visitorData;

	if (!visitorData) {
		throw new Error("No visitor data!");
	}

	const dom = new JSDOM();

	Object.assign(globalThis, {
		window: dom.window,
		document: dom.window.document
	});

	const bgConfig: BgConfig = {
		fetch: (input: string | URL | globalThis.Request, init?: RequestInit) => fetch(input, init),
		globalObj: globalThis,
		identifier: visitorData,
		requestKey
	};

	const bgChallenge = await BG.Challenge.create(bgConfig);

	if (!bgChallenge)
		throw new Error('Could not get challenge');

	const interpreterJavascript = bgChallenge.interpreterJavascript.privateDoNotAccessOrElseSafeScriptWrappedValue;

	if (interpreterJavascript) {
		new Function(interpreterJavascript)();
	} else throw new Error('Could not load VM');

	const poTokenResult = await BG.PoToken.generate({
		program: bgChallenge.program,
		globalName: bgChallenge.globalName,
		bgConfig
	});

	const placeholderPoToken = BG.PoToken.generatePlaceholder(visitorData);

	stdout.write(`Session Info: {
		${visitorData},
		${placeholderPoToken},
		poToken: ${poTokenResult.poToken},
		integrityTokenData: ${poTokenResult.integrityTokenData}
	}`);

	return Innertube.create({
		po_token: poTokenResult.poToken,
		visitor_data: visitorData
	});
}

// Return track data from url
export async function fetchTrackData(_url: string, _youtube?: Innertube): Promise<Song> {
	const youtube = _youtube ?? await createYoutube();

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
