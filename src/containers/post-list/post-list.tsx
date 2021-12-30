import React from 'react';
import { Link } from 'react-router-dom';
import ToggleOffRoundedIcon from '@mui/icons-material/ToggleOffRounded';
import ToggleOnRoundedIcon from '@mui/icons-material/ToggleOnRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import styles from './post-list.scss';
import usePostsAdmin from '@hooks/usePostsAdmin';

const PostList = () => {
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
					<div className={styles['row__column-item']}>
						<Link to='/new-post'>
							<AddRoundedIcon
								color='action'
								fontSize='large'
								className={styles.icon}
							/>
						</Link>
					</div>
					<div className={`${styles['row__column-item']} ${styles['row__column-item--main-content']}`}>Post</div>
					<div className={styles['row__column-item']}>Publish/Edit</div>
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
							<Link to={`/edit-post/${post.id}`}>
								<EditRoundedIcon
									color='action'
									className={styles.icon}
								/>
							</Link>
						</div>
					</div>
				))}
			</>
			}
		</div>
	);
};

export default PostList;