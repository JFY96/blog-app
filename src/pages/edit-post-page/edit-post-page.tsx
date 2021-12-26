import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, TextField } from '@components';
import { useAuth } from '@contexts/authContext';

import containerStyles from '@global/styles.scss';
import formStyles from '@global/formStyle.scss';
import PostService from '@services/post_service';
const styles = { ...containerStyles, ...formStyles };

const EditPostPage = () => {
	const { postId } = useParams<{ postId?: string }>();
	const { loggedIn } = useAuth();

	const [loading, setIsLoading] = useState(true);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [error, setError] = useState('');
	const [saveError, setSaveError] = useState('');

	const getPostInfo = async () => {
		// Get Post
		const result = await PostService.getPost(postId ?? '');
		if (result) {
			setTitle(result.title);
			setContent(result.content);
		}
		setIsLoading(false);
	};
	
	useEffect(() => {
		if (!postId) {
			// Add Post
			setIsLoading(false);
			if (!loggedIn) {
				setError('Not authorized to create post');
				return;
			}
		}
		
		// Edit Post
		if (!loggedIn) {
			setError('Not authorized to edit this post');
			setIsLoading(false);
			return;
		}

		// Check User Allowed to View?
		
		// Get Post
		getPostInfo();
	}, []);

	return (
		<div className={styles['main-content']}>
			<div className={styles['column-content-container']}>
				<h2>{postId ? `Edit Post - ${postId}` : 'New Post'}</h2>
				<div className={styles.container}>
					{loading 
					? 'Loading . . .'
					: error
					||
					<>
					<label className={styles.label}>Title</label>
					<TextField 
						text={title}
						onChange={(event:React.ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)}
					/>
					<label className={styles.label}>Content</label>
					<TextField 
						text={content}
						onChange={(event:React.ChangeEvent<HTMLInputElement>) => setContent(event.currentTarget.value)}
					/>
					<div className={styles.buttonContainer}>
						<span className={saveError ? styles.error : styles.success}>
							{saveError}
						</span>
						<Button
							text='Save'
							onClick={() =>{/* TODO */}}
						/>
					</div>
					</>
					}
				</div>
			</div>
		</div>
	);
};

export default EditPostPage;