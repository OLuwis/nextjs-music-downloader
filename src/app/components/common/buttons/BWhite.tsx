import { ReactNode } from "react"

export default function BWhite({
	text,
	href,
	isLink,
	leftIcon,
	rightIcon
}: {
	text?: string,
	href?: string,
	isLink?: boolean,
	leftIcon?: ReactNode,
	rightIcon?: ReactNode
}) {
	return (
		isLink ?
			<a className="m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href={href}>
				{leftIcon}
				{text}
				{rightIcon}
			</a>
			:
			<button className="m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
				{leftIcon}
				{text}
				{rightIcon}
			</button>
	)
}
