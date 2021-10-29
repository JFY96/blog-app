import React from 'react';
import { Link } from 'react-router-dom';

import styles from './nav.css';

const Nav = () => {
	return (
		<nav className={styles.nav}>
			<div className={styles.nav__logo}>Blog</div>
			<div className={styles.nav__list}>
				<Link className={styles.nav__list__item} to='/'>
					Home
				</Link>
				<Link className={styles.nav__list__item} to='/login'>
					Login
				</Link>
			</div>
		</nav>
	);
};

export default Nav;