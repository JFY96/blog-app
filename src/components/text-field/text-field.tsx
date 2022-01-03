import React, { ForwardedRef, forwardRef } from 'react';

import styles from './text-field.scss';

interface TextFieldProps {
	text: string,
	fieldType?: string,
	[x:string]: any,
}

const TextField = forwardRef(({ text, fieldType = 'text',...otherProps }: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
	return (
		<input type={fieldType}
			className={styles.input}
			value={text}
			ref={ref}
			{...otherProps}
		/>
	);
});

export default TextField;