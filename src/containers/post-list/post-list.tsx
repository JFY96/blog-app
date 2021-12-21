import React from 'react';

import styles from './post-list.css';
import useFetch from '@hooks/useFetch';
import PostService from '@services/post_service';

interface PostProps {
};

const PostList = (props: PostProps) => {
	const { data: posts, isLoading, error } = useFetch(PostService.getPosts);

	return (
		<div className={styles.container}>
			{isLoading ?
				'Loading Posts...'
			:
			error ?
				'An error occured while loading posts'
			:
			<>
				<div className={`${styles.row} ${styles['row--header']}`}>
					<div className={styles['row__column-item']}>Date</div>
					<div className={`${styles['row__column-item']} ${styles['row__column-item--main-content']}`}>Title</div>
					<div className={styles['row__column-item']}>Published?</div>
				</div>
				{posts && posts.map(post => (
					<div className={styles.row}>
						<div className={styles['row__column-item']}>{post.date}</div>
						<div className={`${styles['row__column-item']} ${styles['row__column-item--main-content']}`}>{post.title}</div>
						<div className={styles['row__column-item']}>{post.published ? 'Y' : 'N'}</div>
					</div>
				))}
			</>
			}
		</div>
	);
};

export default PostList;