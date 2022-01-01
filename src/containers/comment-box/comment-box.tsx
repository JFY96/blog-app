import React, { useEffect, useState } from 'react';

import { TextField } from '@components';
import { useAuth } from '@contexts/authContext';
import CommentEditSave from '@containers/comment-edit-save/comment-edit-save';
import styles from '@global/formStyle.scss';

interface CommentBoxProps {
	add: any, // TODO
}

const CommentBox = ({ add }:CommentBoxProps) => {
	const { loggedIn } = useAuth();
	
	const [ name, setName ] = useState<string>('');
	const [ comment, setComment ] = useState<string>('');
	const [ message, setMessage ] = useState<string>('');
	const [ error, setError ] = useState<string>('');
	
	const addComment = async () => {
		setError('');
		const result = await add(comment, name);
		if (result.success) {
			setName('');
			setComment('');
			setMessage('Comment was added!');
		} else {
			if (result.errors !== undefined) setError(result.errors[Object.keys(result.errors)[0]]); // Show first error - not ideal but simple solution
			else setError('Failed to add comment.');
		}
	};

	useEffect(() => {
		setError('');
	}, [name, comment]);

	return (
		<div className={styles.container}>
			<div className={styles.title}>Post a comment</div>
			{!loggedIn &&
			<>
				<label className={styles.label}>Your Name</label>
				<TextField 
					text={name}
					onChange={(event:React.ChangeEvent<HTMLInputElement>) => setName(event.currentTarget.value)}
				/>
			</>
			}
			<label className={styles.label}>Comment</label>
			<CommentEditSave
				comment={comment}
				setComment={setComment}
				error={error}
				displayMessage={message}
				save={addComment}
			/>
		</div>
	);
};

export default CommentBox;