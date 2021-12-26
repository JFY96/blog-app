import React, { useContext, useEffect, useState } from 'react';

import { Button, TextField } from '@components';
// import Button from '@components/button/button';
import styles from '@global/formStyle.scss';
import { useAuth } from '@contexts/authContext';

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
			<TextField
				text={comment}
				onChange={(event:React.ChangeEvent<HTMLInputElement>) => setComment(event.currentTarget.value)}
			/>
			<div className={styles.buttonContainer}>
				<span className={error ? styles.error : styles.success}>
					{error || message}
				</span>
				<Button
					text='Submit'
					onClick={addComment}
				/>
			</div>
		</div>
	);
};

export default CommentBox;