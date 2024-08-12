import React from 'react';
import classNames from 'classnames';

export default function Content({
	className,
	...others
}: React.HTMLProps<HTMLDivElement>) {
	return (
		<div
			className={classNames('flex flex-col flex-1 h-full overflow-y-auto p-4', className)}
			{...others}
		/>
	);
}
