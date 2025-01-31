import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

export default function Input({
	type,
	name,
	value,
	onChange,
	placeholder
}: {
	type: HTMLInputTypeAttribute;
	name?: string;
	value: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	placeholder?: string;
}) {
	return (
		<div className="w-full">
			<input type={type} name={name} className="peer py-2.5 px-4 block w-full border-transparent rounded-lg text-neutral-600 focus:invalid:border-red-500 dark:focus:invalid:border-red-500 focus:invalid:ring-red-500 dark:focus:invalid:ring-red-500 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder={placeholder} value={value} onChange={onChange} />
			<p className="peer-valid:hidden mt-2 pl-1.5 text-sm text-left text-red-500 dark:text-red-500">Track url should begin with - https://</p>
		</div>
	);
}
