import {
	Card,
	CardContent,
	Typography,
	Divider,
	Box,
	IconButton,
	Stack,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import ConfirmationDialog from './ConfirmDialog';
import MoreInfoAccordion from './MoreInfoAccordion';
import EditOrAddGameDialog from './EditOrAddGameDialog';
import { updateGame, deleteGame } from '../query/gameActions';


export default function Game({
	id,
	title,
	genre,
	platform,
	releaseDate,
	description,
   imageUrl,
}) {
	const [confirmDialogIsOpen, setConfirmDialogIsOpen] = useState(false);
	const [itemToDelete, setItemToDelete] = useState(null);
	const [dialogOpen, setDialogOpen] = useState(false);

   const queryClient = useQueryClient();

	const updateGameMutation = useMutation({
		mutationFn: updateGame,
		onSuccess: () => {
			queryClient.invalidateQueries(['myGames']); 
			handleCloseDialog();
		},
		onError: (error) => {
			console.error('Update failed:', error.message);
		},
	});


	const deleteGameMutation = useMutation({
		mutationFn: deleteGame,
		onSuccess: () => {
			queryClient.invalidateQueries(['myGames']); 
			setItemToDelete(null);
			setConfirmDialogIsOpen(false);
		},
		onError: (error) => {
			console.error('Delete failed:', error.message);
		},
	});


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
		if (itemToDelete) {
			deleteGameMutation.mutate(itemToDelete);
		}
	}
   

	function cancelDeletion() {
		setConfirmDialogIsOpen(false);
		setItemToDelete(null);
	}
	return (
		<>
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
						src={imageUrl || '/DummyImages/img.jpg'}
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
			<EditOrAddGameDialog
				open={dialogOpen}
				onClose={handleCloseDialog}
				gameId={id}
				title={title}
				genre={genre}
				platform={platform}
				releaseDate={releaseDate}
				description={description}
				imageUrl={imageUrl}
				onSubmit={(data) => {
					updateGameMutation.mutate({ gameId: id, gameData: data });
				}}
			/>
		</>
	);
}
