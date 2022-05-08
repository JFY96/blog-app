import React, { useState } from "react";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { Comment as CommentInterface } from "@customTypes/interfaces";
import CommentEditSave from "@containers/comment-edit-save/comment-edit-save";
import { useAuth } from "@contexts/authContext";
import { AlertDialog } from '@components';
import localStyles from './comment.scss';
import sharedStyles from '@global/shared.scss';
const styles = { ...localStyles, ...sharedStyles };

interface CommentProps {
	comment: CommentInterface,
	editComment: boolean,
	selectEditComment: React.MouseEventHandler<SVGSVGElement> | undefined,
	removeComment: () => any,
};

const Comment = ({
	comment,
	editComment,
	selectEditComment,
	removeComment,
}: CommentProps) => {
	const { userId, isAdmin } = useAuth();
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const canEdit = isAdmin || (userId.trim() !== '' && userId === comment.user);

	return (
		<div className={styles.container}>
			<AlertDialog // TODO Refactor to use single alertdialog for whole application
				open={dialogOpen}
				close={() => setDialogOpen(false)}
				confirm={async () => {
					const result = await removeComment();
					if (result && result.success) {
						setDialogOpen(false);
					} else {
						// show error toast?
					}
				}}
				confirmText='Yes'
			>
				Are you sure you want to delete this comment?
			</AlertDialog>
			<div className={styles.header}>
				<div>{comment.name}</div>
				<div className={styles['date-container']}>
					<span>{new Date(comment.timestamp).toLocaleDateString()}</span>
					{canEdit && !editComment &&
						<>
						<DeleteRoundedIcon
							color='action'
							className={styles.icon}
							onClick={() => setDialogOpen(true)}
						/>
						<EditRoundedIcon
							color='action'
							className={styles.icon}
							onClick={selectEditComment}
						/>
						</>
					}
				</div>
			</div>
			{(canEdit && editComment)
			?
			<CommentEditSave id={comment.id} />
			:
			<div>{comment.content}</div>
			}
		</div>
	);
};

export default Comment;