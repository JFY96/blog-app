import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { Button, TextArea, TextField } from '@components';
import { useAuth } from '@contexts/authContext';

import containerStyles from '@global/styles.scss';
import formStyles from '@global/formStyle.scss';
import PostService from '@services/post_service';
const styles = { ...containerStyles, ...formStyles };

const EditPostPage = () => {
	const { postId } = useParams<{ postId?: string }>();
	const history = useHistory();
	const { loggedIn } = useAuth();

	const [loading, setIsLoading] = useState(true);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [error, setError] = useState('');
	const [saveError, setSaveError] = useState('');

	const getPostInfo = async () => {
		// Get Post
		setIsLoading(true);
		try {
			const result = await PostService.getPost(postId ?? '');
			if (result) {
				setTitle(result.title);
				setContent(result.content);
			}
			setIsLoading(false);
		} catch {
			setError('Failed to fetch post');
			setIsLoading(false);
		}
	};
	
	const savePost = async () => {
		try {
			const result = postId
				? await PostService.updatePost(postId, { title, content })
				: await PostService.createPost(title, content);
			
			if (result.success) {
				history.push('/admin');
			} else {
				setSaveError(result?.errors?.[0] ?? '');
			}
		} catch {
			setSaveError('Failed to save, please try again.');
		}
	};
	
	useEffect(() => {
		// Check User Logged In
		setError('');
		setSaveError('');
		if (!loggedIn) {
			setIsLoading(false);
			setError(`Not authorized to ${postId ? 'edit this' : 'create new'} post`);
			return;
		}

		if (postId) { // Edit Post
			// Check User Allowed to View?
			
			// Get Post
			getPostInfo();
		} else { // Add Post
			setIsLoading(false);
		}

	}, [loggedIn]);

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
					<label className={styles.label}>Content (supports Markdown syntax)</label>
					<TextArea
						text={content}
						rows={25}
						onChange={(event:React.ChangeEvent<HTMLInputElement>) => setContent(event.currentTarget.value)}
					/>
					<div className={styles.buttonContainer}>
						<span className={saveError ? styles.error : styles.success}>
							{saveError}
						</span>
						<Button
							text='Save'
							onClick={savePost}
						/>
					</div>
					<label className={styles.label}>Preview</label>
					<ReactMarkdown children={content} />
					</>
					}
				</div>
			</div>
		</div>
	);
};

export default EditPostPage;