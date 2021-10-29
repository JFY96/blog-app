import React from "react";
import { useParams } from "react-router";

import Post from "@containers/post/post";
import { postExamples as posts, commentExamples as comments } from '@services/post_service';
import { Post as PostInterface } from '@customTypes/interfaces';
import CommentBox from "@containers/comment-box/comment-box";
import Comment from "@containers/comment/comment";

const PostPage = () => {
	const { postId } = useParams<{postId?: string}>();
	const post:PostInterface = posts.filter(post => post.id === postId)?.[0] ?? {};
	return (
		<div className='main-content'>
			<div className='column-content-container'>
				<Post post={post} />
				<CommentBox />
				{comments.map(comment => <Comment comment={comment} />)}
			</div>
		</div>
	);
};

export default PostPage;