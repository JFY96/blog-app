import React from "react";

import { Comment as CommentInterface } from "@customTypes/interfaces";
import styles from './comment.scss';

interface CommentProps {
	comment: CommentInterface,
};

const Comment = (props: CommentProps) => {
	const { comment } = props;
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>{comment.name}</div>
				<div>{new Date(comment.timestamp).toLocaleDateString()}</div>
			</div>
			<div>{comment.content}</div>
		</div>
	);
};

export default Comment;