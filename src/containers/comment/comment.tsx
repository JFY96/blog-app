import React, { useState } from "react";
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import { Comment as CommentInterface } from "@customTypes/interfaces";
import CommentEditSave from "@containers/comment-edit-save/comment-edit-save";
import { useAuth } from "@contexts/authContext";
import localStyles from './comment.scss';
import sharedStyles from '@global/shared.scss';
const styles = { ...localStyles, ...sharedStyles };

interface CommentProps {
	comment: CommentInterface,
	editComment: boolean,
	selectEditComment: any,
	editCommentContent: string,
	setEditCommentContent: any,
	error: string,
	saveEdit: any,
};

const Comment = ({
	comment,
	editComment,
	selectEditComment,
	editCommentContent,
	setEditCommentContent,
	error,
	saveEdit,
}: CommentProps) => {
	const { userId, isAdmin } = useAuth();
	const canEdit = isAdmin || (userId.trim() !== '' && userId === comment.user);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>{comment.name}</div>
				<div className={styles['date-container']}>
					<span>{new Date(comment.timestamp).toLocaleDateString()}</span>
					{canEdit && !editComment &&
						<EditRoundedIcon
							color='action'
							className={styles.icon}
							onClick={selectEditComment}
						/>
					}
				</div>
			</div>
			{(canEdit && editComment)
			?
			<CommentEditSave
				comment={editCommentContent}
				setComment={setEditCommentContent}
				error={error}
				displayMessage={''}
				save={saveEdit}
			/>
			:
			<div>{comment.content}</div>
			}
		</div>
	);
};

export default Comment;