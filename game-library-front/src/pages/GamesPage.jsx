import { useState } from 'react';
import { Box, Grid, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Game from '../components/Game.jsx';
import EditOrAddGameDialog from '../components/EditOrAddGameDialog.jsx';
import { getMyGames, addGame } from '../query/gameActions.js';

export default function GamesPage() {
	const [dialogOpen, setDialogOpen] = useState(false);
	const name = localStorage.getItem('name');

	const queryClient = useQueryClient();

	// Fetch games
	const {
		data: games,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['myGames'],
		queryFn: getMyGames,
	});

	// Mutation for adding a game
	const addGameMutation = useMutation({
		mutationFn: addGame,
		onSuccess: () => {
			queryClient.invalidateQueries(['myGames']);
			handleCloseDialog();
		},
      onError: (error) => {
         console.error('Add failed:', error.message);
      }
	});

	function handleAddClick() {
		setDialogOpen(true);
	}

	function handleCloseDialog() {
		setDialogOpen(false);
	}

	if (isLoading) return <p>Loading your games...</p>;
	if (isError) return <p>Error: {error.message}</p>;


	return (
		<>
			<Box sx={{ p: 4 }}>
				<h1>{name} Here are your games:</h1>
				<Grid
					container
					spacing={2}
					alignItems='stretch'
				>
					{games.map((game) => (
						<Grid
							item
							key={game.id}
							xs={12}
							sm={6}
							md={4}
							lg={3}
							sx={{ display: 'flex' }}
						>
							<Game {...game} />
						</Grid>
					))}
				</Grid>

				<Fab
					color='primary'
					aria-label='add'
					sx={{
						position: 'fixed',
						bottom: 16,
						right: 16,
						width: 80,
						height: 80,
					}}
					onClick={handleAddClick}
				>
					<AddIcon />
				</Fab>
			</Box>

			<EditOrAddGameDialog
				open={dialogOpen}
				onClose={handleCloseDialog}
				isEditMode={false}
				onSubmit={(formData) => addGameMutation.mutate(formData)}
			/>
		</>
	);
}
