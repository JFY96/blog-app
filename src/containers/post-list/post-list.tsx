import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ToggleOffRoundedIcon from '@mui/icons-material/ToggleOffRounded';
import ToggleOnRoundedIcon from '@mui/icons-material/ToggleOnRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { AlertDialog } from '@components';


import usePostsAdmin from '@hooks/usePostsAdmin';
import localStyles from './post-list.scss';
import sharedStyles from '@global/shared.scss';
const styles = { ...localStyles, ...sharedStyles };

const PostList = () => {
	const { data: posts, isLoading, error, publish, remove } = usePostsAdmin();
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const [dialogPostId, setDialogPostId] = useState<string>('');

	return (
		<div className={styles.container}>
			<AlertDialog // TODO Refactor to use single alertdialog for whole application
				open={dialogOpen}
				close={() => setDialogOpen(false)}
				confirm={async () => {
					if (dialogPostId === '') setDialogOpen(false);
					const result = await remove(dialogPostId);
					if (result && result.success) {
						setDialogOpen(false);
						setDialogPostId('');
					} else {
						// show error toast?
					}
				}}
				confirmText='Yes'
			>
				Are you sure you want to delete this Post and all of its comments?
			</AlertDialog>
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
					<div className={`${styles['row__column-item']}  ${styles['row__column-item--align-right']}`}>Actions</div>
				</div>
				{posts && posts.map(post => (
					<div key={post.id} className={styles.row}>
						<div className={styles['row__column-item']}>{post.date}</div>
						<div className={`${styles['row__column-item']} ${styles['row__column-item--main-content']}`}>{post.title}</div>
						<div className={`${styles['row__column-item']}  ${styles['row__column-item--with-button']}`}>
							{post.published
							? 
							<ToggleOnRoundedIcon 
								fontSize='large'
								color='success'
								className={styles.icon}
								onClick={() => publish(post.id, false)}
							/>
							: 
							<ToggleOffRoundedIcon
								fontSize='large'
								color='disabled'
								className={styles.icon}
								onClick={() => publish(post.id)}
							/>
							}
							<DeleteRoundedIcon
								color='action'
								className={styles.icon}
								onClick={() => {
									setDialogOpen(true);
									setDialogPostId(post.id);
								}}
							/>
							<Link to={`/edit-post/${post.id}`}>
								<EditRoundedIcon
									color='action'
									className={styles.icon}
								/>
							</Link>
							<Link to={`/post/${post.id}`}>
								<ExitToAppRoundedIcon
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