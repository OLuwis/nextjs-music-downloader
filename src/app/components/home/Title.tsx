export default function Title({
	text
}: {
	text: string;
}) {
	return (
		<h1 className="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-neutral-200">
			{text}
		</h1>
	);
}
