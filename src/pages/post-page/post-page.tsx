import React, { ForwardedRef, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

import Post from "@containers/post/post";
import PostService from '@services/post_service';
import CommentBox from "@containers/comment-box/comment-box";
import Comment from "@containers/comment/comment";
import useFetch from "@hooks/useFetch";
import useComments from "@hooks/useComments";
import styles from '@global/styles.scss';
import { Comment as CommentInterface } from "@customTypes/interfaces";

interface CommentEditContextValue {
	inputRef: ForwardedRef<HTMLInputElement>,
	addMode: boolean,
	commentId: string,
	content: string,
	setContent: React.Dispatch<React.SetStateAction<string>>,
	save: () => Promise<any>,
	error: string,
	displayMessage?: string,
};

const CommentEditContext = React.createContext<CommentEditContextValue | undefined>(undefined);

const PostPage = () => {
	const { postId } = useParams<{ postId: string }>();

	const { data:post, isLoading:postsLoading, error:postError } = useFetch(() => PostService.getPost(postId));

	const { data:comments, isLoading:commentsLoading, error:commentsError, add, update } = useComments(postId);

	const [addMode, setAddMode] = useState(true);
	const [commentId, setCommentId] = useState('');
	const [name, setName] = useState('');
	const [content, setContent] = useState('');
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setError('');
		setMessage('');
	}, [name, content, commentId]);

	useEffect(() => {
		if (inputRef.current !== null) inputRef.current.focus();
	}, [commentId]);

	const save = async () => {
		setError('');
		setMessage('');
		try {
			if (addMode) {
				const result = await add(content, name);
				if (!result) throw new Error('Failed to update');
				if (result.success) {
					setName('');
					setContent('');
					setMessage('Comment was added!');
				} else {
					if (result.errors !== undefined) setError(result.errors[Object.keys(result.errors)[0]]); // Show first error - not ideal but simple solution
					else setError('Failed to add comment');
				}
			} else {
				const result = await update(commentId, content);
				if (result && !result.success) {
					setError(result.error ?? 'Failed to update comment');
				}
				setCommentId('');
			}
		} catch {
			setError('An error occurred while updating comment');
		}
	};

	const selectEditComment = (comment: CommentInterface) => {
		setAddMode(false);
		setCommentId(comment.id);
		setName('');
		setContent(comment.content);
	};

	const selectAddComment = (reset: boolean) => {
		setAddMode(!reset);
		setCommentId('');
		setName('');
		setContent('');
	};

	return (
		<CommentEditContext.Provider value={{
			inputRef,
			addMode,
			commentId,
			content,
			setContent,
			save,
			error,
			displayMessage: message,
		}}>
			<div className={styles['main-content']}>
				<div className={styles['column-content-container']}>
					<Post post={post} />
					<CommentBox
						name={name}
						setName={setName}
						adding={addMode && commentId===''}
						selectAdding={() => selectAddComment(false)}
						resetAdding={() => selectAddComment(true)}
					/>
					{commentsLoading 
					? 'Loading Comments...'
					: !comments 
					? 'No Comments Found'
					: comments.map(comment => 
						<Comment
							key={comment.id}
							comment={comment}
							editComment={commentId===comment.id}
							selectEditComment={() => selectEditComment(comment)}
						/>
					)
					}
				</div>
			</div>
		</CommentEditContext.Provider>
	);
};

const useCommentEdit = () => {
	const context = useContext(CommentEditContext);
	if (context === undefined) {
		throw new Error('useCommentEditProvider must be used inside a CommentEditProvider');
	}
	return context;
};

export { useCommentEdit };

export default PostPage;