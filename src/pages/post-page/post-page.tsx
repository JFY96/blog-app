import React, { useState } from "react";
import { useParams } from "react-router";

import Post from "@containers/post/post";
import PostService from '@services/post_service';
import CommentBox from "@containers/comment-box/comment-box";
import Comment from "@containers/comment/comment";
import useFetch from "@hooks/useFetch";
import useComments from "@hooks/useComments";
import styles from '@global/styles.scss';

const PostPage = () => {
	const { postId } = useParams<{ postId: string }>();

	const { data:post, isLoading:postsLoading, error:postError } = useFetch(() => PostService.getPost(postId));

	const { data:comments, isLoading:commentsLoading, error:commentsError, add, update } = useComments(postId);

	const [editCommentId, setEditCommentId] = useState('');
	const [commentContent, setCommentContent] = useState('');
	const [error, setError] = useState('');

	const saveEdit = async () => {
		setError('');
		try {
			const result = await update(editCommentId, commentContent);
			if (result && !result.success) {
				setError(result.error ?? 'Failed to update comment');
			}
			setEditCommentId('');
		} catch {
			setError('An error occurred while updating comment');
		}
	};

	return (
		<div className={styles['main-content']}>
			<div className={styles['column-content-container']}>
				<Post post={post} />
				<CommentBox add={add} />
				{commentsLoading 
				? 'Loading Comments...'
				: !comments 
				? 'No Comments Found'
				: comments.map(comment => 
					<Comment
						key={comment.id}
						comment={comment}
						editComment={editCommentId===comment.id}
						selectEditComment={() => {
							setEditCommentId(comment.id);
							setCommentContent(comment.content);
						}}
						editCommentContent={commentContent}
						setEditCommentContent={setCommentContent}
						error={error}
						saveEdit={saveEdit}
					/>
				  )
				}
			</div>
		</div>
	);
};

export default PostPage;