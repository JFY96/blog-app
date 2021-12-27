import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './nav.scss';
import { useAuth } from '@contexts/authContext';

const Nav = () => {
	const { loggedIn, isAdmin, userLogout } = useAuth();
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
					<span
						className={styles.nav__list__item} 
						onClick={userLogout}
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