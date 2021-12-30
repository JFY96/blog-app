import React from 'react';

import styles from './text-field.scss';

interface TextFieldProps {
	text: string,
	fieldType?: string,
	[x:string]: any,
}

const TextField = ({ text, fieldType = 'text',...otherProps }: TextFieldProps) => {
	return (
		<input type={fieldType}
			className={styles.input}
			value={text}
			{...otherProps}
		/>
	);
};

export default TextField;