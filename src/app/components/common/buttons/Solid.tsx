import { MouseEventHandler, ReactNode } from "react";

export default function ButtonSolid({
	text,
	href,
	size,
	isLink,
	onClick,
	leftIcon,
	rightIcon,
	className
}: {
	text?: string;
	href?: string;
	size?: "sm";
	isLink?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	className?: string;
}) {
	return (
		isLink ?
			<a className={`${size ? "size-[30px] w-fit" : "size-[46px]"} inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ${className}`} href={href} rel="_blank" target="_blank" rel="noopener noreferrer">
				{leftIcon}
				{text}
				{rightIcon}
			</a>
			:
			<button className={`${size ? "size-[30px] w-fit" : "size-[46px]"} inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ${className}`} onClick={onClick}>
				{leftIcon}
				{text}
				{rightIcon}
			</button>
	);
}
