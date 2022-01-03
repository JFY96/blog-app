import React from 'react';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

import { TextField } from '@components';
import { useAuth } from '@contexts/authContext';
import CommentEditSave from '@containers/comment-edit-save/comment-edit-save';
import formStyles from '@global/formStyle.scss';
import sharedStyles from '@global/shared.scss';
const styles = { ...formStyles, ...sharedStyles };

interface CommentBoxProps {
	name: string,
	setName: React.Dispatch<React.SetStateAction<string>>,
	adding: boolean,
	selectAdding: () => any,
	resetAdding: () => any,
};

const CommentBox = ({ name, setName, adding, selectAdding, resetAdding }:CommentBoxProps) => {
	const { loggedIn } = useAuth();

	return (
		<div className={styles.container}>
			<div className={`${styles.title} ${styles.buttonContainer}`}>
				Post a comment
				{adding ?
					<ExpandLessRoundedIcon
						color='action'
						fontSize='large'
						className={styles.icon}
						onClick={resetAdding}
					/>
				: 
					<ExpandMoreRoundedIcon
						color='action'
						fontSize='large'
						className={styles.icon}
						onClick={selectAdding}
					/>
				}
			</div>
			{adding &&
			<>
				{!loggedIn &&
					<>
					<label className={styles.label}>Your Name</label>
					<TextField 
					text={name}
					onChange={(event:React.ChangeEvent<HTMLInputElement>) => setName(event.currentTarget.value)}
					/>
					</>
				}
				<label className={styles.label}>Comment</label>
				<CommentEditSave modeIsAdd={true} />
			</>
			}
		</div>
	);
};

export default CommentBox;