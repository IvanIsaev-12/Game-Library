import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
export default function ConfirmationDialog({confirmOpen, cancelDeletion, confirmDeletion, text}){
   return (
		<Dialog
			open={confirmOpen}
			onClose={cancelDeletion}
		>
			<DialogTitle>Confirm Deletion</DialogTitle>
			<DialogContent>
            {text}
			</DialogContent>
			<DialogActions>
				<Button onClick={cancelDeletion}>Cancel</Button>
				<Button
					color='error'
					onClick={confirmDeletion}
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
}