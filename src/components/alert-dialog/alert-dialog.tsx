import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { makeStyles } from '@mui/styles';

import { Button } from '@components';

interface AlertDialogProps {
	children: React.ReactNode | string,
	open: boolean,
	close: (x?: any) => any,
	confirm: (x?: any) => any,
	confirmText?: string,
	cancelText?: string,
};

const useStyles = makeStyles({
	topScrollPaper: {
		alignItems: 'flex-start !important',
		marginTop: '5vh',
	 },
});

const AlertDialog = ({ children, open, close, confirm, confirmText = 'Confirm', cancelText = 'Cancel' }: AlertDialogProps) => {
	const classes = useStyles();
	return (
		<Dialog
			open={open}
			onClose={close}
			classes={{
				scrollPaper: classes.topScrollPaper,
			}}
		>
			<DialogContent>
				<DialogContentText>
					{children}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button text={cancelText} onClick={close} />
				<Button text={confirmText} onClick={confirm} />
			</DialogActions>
		</Dialog>
	);
};

export default AlertDialog;