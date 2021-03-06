import React from 'react';
import ReactMarkdown from 'react-markdown';

import { ConditionalLink } from '@components';
import { Post as PostInterface } from '@customTypes/interfaces';
import styles from './post.scss';

interface PostProps {
	post: PostInterface | undefined,
	preview?: boolean,
};

const Post = (props: PostProps) => {
	const { post, preview = false } = props;

	return (
		<div className={styles.container}>
			{post === undefined ? 'Post not found' : <>
				<div className={styles.header}>
					<ConditionalLink to={`/post/${post.id}`} className={styles.header__link} condition={preview}>
						<div className={styles.header__title}>{post.title}</div>
					</ConditionalLink>
					<div className={styles.header__date}>{post.date}</div>
				</div>
				<div className={styles.content}>
					<ReactMarkdown children={post.content} />
				</div>
				{preview &&
				<div className={styles.footer}>
					<span className={styles.footer__commentCount}>Comments: {post.commentCount}</span>
				</div>
				}
			</>}
		</div>
	);
};

export default Post;