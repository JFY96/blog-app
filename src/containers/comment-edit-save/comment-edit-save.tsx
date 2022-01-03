import React from 'react';

import { Button, TextField } from '@components';
import styles from '@global/formStyle.scss';
import { useCommentEdit } from '@pages/post-page/post-page';

interface CommentEditSaveProps {
	id?: string,
	modeIsAdd?: boolean,
};

const CommentEditSave = ({ id = '', modeIsAdd = false }: CommentEditSaveProps) => {
	const { inputRef, addMode, commentId, content, setContent, save, error, displayMessage } = useCommentEdit();
	if (modeIsAdd !== addMode || commentId !== id) return null;
	return (
		<>
			<TextField
				text={content}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => setContent(event.currentTarget.value)}
				ref={inputRef}
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