export default function Subtitle({
	text
}: {
	text: string
}) {
	return (
		<p className="mt-3 text-gray-600 dark:text-neutral-400">
			{text}
		</p>
	)
}
