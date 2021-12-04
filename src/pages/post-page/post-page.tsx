import React from "react";
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

	const { data:comments, isLoading:commentsLoading, error:commentsError, add } = useComments(postId);

	return (
		<div className={styles['main-content']}>
			<div className={styles['column-content-container']}>
				<Post post={post} />
				<CommentBox add={add} />
				{commentsLoading ? 'Loading Comments...'
				: !comments ? 'No Comments Found'
				: comments.map(comment => <Comment key={comment.id} comment={comment} />)
				}
			</div>
		</div>
	);
};

export default PostPage;