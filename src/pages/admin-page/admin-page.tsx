import React from 'react';

import styles from '@global/styles.scss';
import { useAuth } from '@contexts/authContext';
import PostList from '@containers/post-list/post-list';

const AdminPage = () => {
	const { isAdmin } = useAuth();

	return (
		<div className={styles['main-content']}>
			<div className={styles['column-content-container']}>
				{isAdmin
				?
				<>
					<PostList />
				</>
				:
				<h1>Not Authorised</h1>
				}
			</div>
		</div>
	);
};

export default AdminPage;