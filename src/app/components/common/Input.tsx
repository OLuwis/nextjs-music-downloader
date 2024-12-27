export default function Input({
	type,
	name,
	value,
	placeholder
}: {
	type: "text" | "email",
	name?: string,
	value: string,
	placeholder?: string
}) {
	return (
		<div className="w-full">
			<input type={type} name={name} id="hs-search-article-1" className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder={placeholder} value={value} />
		</div>
	)
}
