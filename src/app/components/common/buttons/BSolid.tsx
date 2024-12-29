import { MouseEventHandler, ReactNode } from "react"

export default function BSolid({
	text,
	href,
	isLink,
	onClick,
	leftIcon,
	rightIcon
}: {
	text?: string,
	href?: string,
	isLink?: boolean,
	onClick?: MouseEventHandler<HTMLButtonElement>,
	leftIcon?: ReactNode,
	rightIcon?: ReactNode
}) {
	return (
		isLink ?
			<a className="size-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" href={href}>
				{leftIcon}
				{text}
				{rightIcon}
			</a>
			:
			<button className="size-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" onClick={onClick}>
				{leftIcon}
				{text}
				{rightIcon}
			</button>
	)
}
