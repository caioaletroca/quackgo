import classNames from 'classnames';
import React from 'react';

export type IconProps = React.HTMLProps<HTMLSpanElement>;

export default function Icon({ className, children, ...others }: IconProps) {
	return (
		<span className={classNames('material-symbols-outlined', className)} {...others}>
			{children}
		</span>
	);
}
