import React from 'react';

import styles from './button.css';

interface ButtonProps {
	text: string,
	[x:string]: any,
}

const Button = ({ text, ...otherProps }:ButtonProps) => {
	return (
		<button type="button"
			className={styles.btn}
			{...otherProps}
		>
			{text}
		</button>
	);
};

export default Button;