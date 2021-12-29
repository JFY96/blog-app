import React from 'react';

import styles from './text-area.scss';

interface TextAreaProps {
	text: string,
	rows?: number,
	[x:string]: any,
}

const TextArea = ({ text, rows = 10, ...otherProps }: TextAreaProps) => {
	return (
		<textarea
			className={styles.textarea}
			value={text}
			rows={rows}
			{...otherProps}
		/>
	);
};

export default TextArea;