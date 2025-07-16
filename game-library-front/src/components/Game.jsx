import {
	Card,
	CardContent,
	Typography,
	Button,
	Divider,
	Box,
	IconButton,
} from '@mui/material';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from './ConfirmDialog';

export default function Game({
	title,
	genre,
	platform,
	releaseDate,
	description,
}) {
	const [confirmDialogIsOpen, setConfirmDialogIsOpen] = useState(false);
	const [itemToDelete, setItemToDelete] = useState(null);

	function handleDelete(itemId) {
		setItemToDelete(itemId);
		setConfirmDialogIsOpen(true);
	}

	function confirmDeletion() {
		//TODO: DELETE the item
		console.log('Deleting item with ID:', itemToDelete);
		setConfirmDialogIsOpen(false);
	}

	function cancelDeletion() {
		setConfirmDialogIsOpen(false);
		setItemToDelete(null);
	}

	function handleInfo() {
		console.log('More info about:', title);
	}

	return (
		<Card
			variant='outlined'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '25rem',
			}}
		>
			<CardContent sx={{ flexGrow: 1 }}>
				<Typography
					variant='h5'
					component='div'
					gutterBottom
				>
					{title}
				</Typography>

				<Box
					component='img'
					src='/DummyImages/img.jpg'
					alt='image'
					sx={{ width: '25rem' }}
				/>

				<Typography color='text.secondary'>Genre: {genre}</Typography>
				<Typography color='text.secondary'>Platform: {platform}</Typography>
				<Typography color='text.secondary'>
					Released: {releaseDate}
				</Typography>
				<Typography
					variant='body2'
					mt={1}
				>
					{description}
				</Typography>

				<Divider sx={{ my: 2 }} />

				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'
				>
					<Button
						variant='contained'
						startIcon={<FontAwesomeIcon icon={faInfo} />}
						onClick={handleInfo}
					>
						More Info
					</Button>

					<IconButton
						color='error'
						onClick={() => handleDelete(title)}
					>
						<DeleteIcon />
					</IconButton>
				</Box>
			</CardContent>

			<ConfirmationDialog
				confirmOpen={confirmDialogIsOpen}
				cancelDeletion={cancelDeletion}
				confirmDeletion={confirmDeletion}
				text={'Are you sure you want to delete this item?'}
			/>
		</Card>
	);
}
