import React from 'react';
import ToggleOffRoundedIcon from '@mui/icons-material/ToggleOffRounded';
import ToggleOnRoundedIcon from '@mui/icons-material/ToggleOnRounded';

import styles from './post-list.scss';
import usePostsAdmin from '@hooks/usePostsAdmin';

interface PostProps {
};

const PostList = (props: PostProps) => {
	const { data: posts, isLoading, error, publish } = usePostsAdmin();

	return (
		<div className={styles.container}>
			{isLoading ?
				'Loading Posts...'
			:
			error ?
				'An error occured'
			:
			<>
				<div className={`${styles.row} ${styles['row--header']}`}>
					<div className={styles['row__column-item']}>Date</div>
					<div className={`${styles['row__column-item']} ${styles['row__column-item--main-content']}`}>Title</div>
					<div className={styles['row__column-item']}>Publish</div>
				</div>
				{posts && posts.map(post => (
					<div key={post.id} className={styles.row}>
						<div className={styles['row__column-item']}>{post.date}</div>
						<div className={`${styles['row__column-item']} ${styles['row__column-item--main-content']}`}>{post.title}</div>
						<div className={`${styles['row__column-item']} ${styles['row__column-item--with-button']}`}>
							{post.published
							? 
							<ToggleOnRoundedIcon 
								fontSize='large'
								color='success'
								className={styles.icon}
								onClick={() => {publish(post.id, false)}}
								/>
								: 
							<ToggleOffRoundedIcon
								fontSize='large'
								color='disabled'
								className={styles.icon}
								onClick={() => {publish(post.id)}}
							/>
							}
						</div>
					</div>
				))}
			</>
			}
		</div>
	);
};

export default PostList;