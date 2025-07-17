import { useState } from 'react';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Masonry } from '@mui/lab';

import Game from '../components/Game.jsx';
import EditOrAddGameDialog from '../components/EditOrAddGameDialog.jsx';
import { getMyGames, addGame } from '../query/gameActions.js';


//For Testing://////////
//import { useEffect } from 'react';
//import { generateAndAddDummyGames, deleteAllDummyGames } from '../test/randomGameDataGenerator.js';
///////////////////////

export default function GamesPage() {

   //////////////////////////
   //ForTesting:
   //useEffect(() => {
		//deleteAllDummyGames()
      //generateAndAddDummyGames();
      // .then(() => {
		// 	generateAndAddDummyGames();
		// });
	//}, []);
   //////////////////////////




	const [dialogOpen, setDialogOpen] = useState(false);
	const name = localStorage.getItem('name');

	const queryClient = useQueryClient();

	const {
		data: games,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['myGames'],
		queryFn: getMyGames,
	});

	const addGameMutation = useMutation({
		mutationFn: addGame,
		onSuccess: () => {
			queryClient.invalidateQueries(['myGames']);
			handleCloseDialog();
		},
		onError: (error) => {
			console.error('Add failed:', error.message);
		},
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

            {(!games || games.length === 0) && <p>No games found. Try adding some with the + button</p> }
				<Masonry
					columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
					spacing={2}
				>
					{games.map((game) => (
						<Game
							key={game.id}
							{...game}
						/>
					))}
				</Masonry>

				

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
