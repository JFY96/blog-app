import React from 'react';

import styles from './text-field.css';

interface TextFieldProps {
	text: string,
	[x:string]: any,
}

const TextField = ({ text, ...otherProps }: TextFieldProps) => {
	return (
		<input type="text"
			className={styles.input}
			value={text}
			{...otherProps}
		/>
	);
};

export default TextField;