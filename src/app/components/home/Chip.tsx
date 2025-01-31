import { ReactNode } from "react"

export default function Chip({
	text,
	icon,
	className
}: {
	text?: string;
	icon?: ReactNode;
	className?: string;
}) {
	return (
		<div>
			<span className={`py-1.5 px-2.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-full ${className}`}>
				{icon}
				{text}
			</span>
		</div>
	)
}
