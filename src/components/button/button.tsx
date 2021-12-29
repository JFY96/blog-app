import React, { useEffect } from 'react';

import styles from './button.css';

interface ButtonProps {
	text: string,
	enterKeyClicksButton?: boolean,
	[x:string]: any,
}

const Button = ({ text, enterKeyClicksButton = false, ...otherProps }:ButtonProps) => {

	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			if (enterKeyClicksButton && otherProps.onClick && event.code === 'Enter') {
				// event.preventDefault();
				otherProps.onClick();
			}
		};
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, [enterKeyClicksButton, otherProps.onClick]);

	return (
		<button type='button'
			className={styles.btn}
			{...otherProps}
		>
			{text}
		</button>
	);
};

export default Button;