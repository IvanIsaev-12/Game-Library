import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
export default function ConfirmationDialog({confirmOpen, cancel, confirm, text, title,confirmText,cancelText}){
   return (
		<Dialog
			open={confirmOpen}
			onClose={cancel}
		>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
            {text}
			</DialogContent>
			<DialogActions>
				<Button onClick={cancel}>{cancelText}</Button>
				<Button
					color='error'
					onClick={confirm}
				>
					{confirmText}
				</Button>
			</DialogActions>
		</Dialog>
	);
}