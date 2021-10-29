import React from 'react';

import { Button, TextField } from '@components';
// import Button from '@components/button/button';
import styles from './comment-box.css';

const CommentBox = () => {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Post a comment</div>
			<label className={styles.label}>Your Name</label>
			<TextField text="" />
			<label className={styles.label}>Comment</label>
			<TextField text="" />
			<div className={styles.buttonContainer}>
				<Button text="Submit" />
			</div>
		</div>
	);
};

export default CommentBox;