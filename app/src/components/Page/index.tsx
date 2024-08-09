import React from 'react';
import classNames from 'classnames';

export default function Page({
	className,
	...others
}: React.HTMLProps<HTMLDivElement>) {
	return (
		<div
			className={classNames('flex flex-col flex-1 h-full', className)}
			{...others}
		/>
	);
}
