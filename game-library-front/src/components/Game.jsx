import {
	Card,
	CardContent,
	Typography,
	Divider,
	Box,
	IconButton,
	Stack,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmationDialog from './ConfirmDialog';
import MoreInfoAccordion from './MoreInfoAccordion';
import EditOrAddGameDialog from './EditOrAddGameDialog';

export default function Game({
	userId,
	id,
	title,
	genre,
	platform,
	releaseDate,
	description,
}) {
	const navigate = useNavigate();
	const [confirmDialogIsOpen, setConfirmDialogIsOpen] = useState(false);
	const [itemToDelete, setItemToDelete] = useState(null);
	const [dialogOpen, setDialogOpen] = useState(false);

	function handleEdit(gameId) {
		setDialogOpen(true);
	}

	function handleCloseDialog() {
		setDialogOpen(false);
	}

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
	return (
		<>
			<EditOrAddGameDialog
				open={dialogOpen}
				onClose={handleCloseDialog}
				gameId={id}
            title={title}
            genre={genre}
            platform={platform}
            releaseDate={releaseDate}
            description={description}
            
			/>
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

					<Divider sx={{ my: 2 }} />

					<Box
						display='flex'
						justifyContent='space-between'
						alignItems='center'
					>
						<MoreInfoAccordion>
							<Typography color='text.secondary'>
								Genre: {genre}
							</Typography>
							<Typography color='text.secondary'>
								Platform: {platform}
							</Typography>
							<Typography color='text.secondary'>
								Released: {releaseDate}
							</Typography>
							<Typography
								variant='body2'
								mt={1}
							>
								{description}
							</Typography>
						</MoreInfoAccordion>

						<Stack direction={'row'}>
							<IconButton
								color='primary'
								onClick={handleEdit}
							>
								<EditIcon />
							</IconButton>
							<IconButton
								color='error'
								onClick={() => handleDelete(id)}
							>
								<DeleteIcon />
							</IconButton>
						</Stack>
					</Box>
				</CardContent>

				<ConfirmationDialog
					confirmOpen={confirmDialogIsOpen}
					cancel={cancelDeletion}
					confirm={confirmDeletion}
					text={'Are you sure you want to delete this item?'}
					title={'Confirm Deletion'}
					confirmText={'Delete'}
					cancelText={'Cancel'}
				/>
			</Card>
		</>
	);
}
