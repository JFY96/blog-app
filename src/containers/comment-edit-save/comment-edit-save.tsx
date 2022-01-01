import React from 'react';

import { Button, TextField } from '@components';
import styles from '@global/formStyle.scss';

interface CommentEditSaveProps {
	comment: string,
	setComment: (event: string) => any,
	save: () => any,
	error: string,
	displayMessage?: string,
};

const CommentEditSave = ({
	comment,
	setComment,
	save,
	error,
	displayMessage='',
}: CommentEditSaveProps) => {
	return (
		<>
			<TextField
				text={comment}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => setComment(event.currentTarget.value)}
			/>
			<div className={styles.buttonContainer}>
				<span className={error ? styles.error : styles.success}>
					{error || displayMessage}
				</span>
				<Button
					text='Submit'
					enterKeyClicksButton={true}
					onClick={save}
				/>
			</div>
		</>
	);
};

export default CommentEditSave;