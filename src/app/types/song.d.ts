export default interface Song {
	platform: "soundcloud" | "youtube music"
	title: string
	artist: string
	cover: string
	stream: {
		url: string
		formats: {
			input: string
			output: string
			mime: string
		}
	}
}
