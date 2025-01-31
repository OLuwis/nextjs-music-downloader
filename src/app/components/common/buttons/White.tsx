import { MouseEventHandler, ReactNode } from "react";

export default function ButtonWhite({
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
			<a className={`${size ? "size-[30px] w-fit" : "size-[46px]"} m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${className}`} href={href}>
				{leftIcon}
				{text}
				{rightIcon}
			</a>
			:
			<button className={`${size ? "size-[30px] w-fit" : "size-[46px]"} m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${className}`} onClick={onClick}>
				{leftIcon}
				{text}
				{rightIcon}
			</button>
	);
}
