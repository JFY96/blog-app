import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from './nav.scss';
import { useAuth } from '@contexts/authContext';
import { AlertDialog } from '@components';

const Nav = () => {
	const { loggedIn, isAdmin, userLogout } = useAuth();
	const history = useHistory();

	const [logoutDialogOpen, setLogoutDialogOpen] = useState<boolean>(false);

	return (
		<nav className={styles.nav}>
			<div className={styles.nav__logo}>Blog</div>
			<div className={styles.nav__list}>
				<Link className={styles.nav__list__item} to='/'>
					Home
				</Link>
				{!loggedIn
				?
				<Link className={styles.nav__list__item} to='/login'>
					Login
				</Link>
				:
				<>
					{isAdmin &&
					<Link className={styles.nav__list__item} to='/admin'>
						Admin
					</Link>
					}
					<AlertDialog 
						open={logoutDialogOpen}
						close={() => setLogoutDialogOpen(false)}
						confirm={async () => {
							const logoutResult = await userLogout();
							if (logoutResult.success) {
								setLogoutDialogOpen(false);
								history.push('/');
							} else {
								// show error toast?
							}
						}}
						confirmText='Log out'
					>
						Are you sure you want to logout? You will be returned to the home page.
					</AlertDialog>
					<span
						className={styles.nav__list__item} 
						onClick={() => setLogoutDialogOpen(true)}
					>
						Logout
					</span>
				</>
				}
			</div>
		</nav>
	);
};

export default Nav;