import { useParams } from 'react-router-dom';
import { Box, Grid, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import Game from '../components/Game.jsx';

const DUMMY_GAMES = [
	{
		id: 1,
		title: 'Rainbow6',
		genre: 'FPS',
		platform: 'PC,XBOX,PS',
		releaseDate: '2016',
		description: 'Tactical shooter focused on team strategy and destruction.',
	},
	{
		id: 2,
		title: 'The Witcher 3',
		genre: 'RPG',
		platform: 'PC,PS,XBOX,SWITCH',
		releaseDate: '2015',
		description:
			'Open-world fantasy RPG with rich storytelling and deep quests.',
	},
	{
		id: 3,
		title: 'Minecraft',
		genre: 'Sandbox',
		platform: 'PC,XBOX,PS,SWITCH,MOBILE',
		releaseDate: '2011',
		description:
			'Creative sandbox game about building, survival, and exploration.',
	},
	{
		id: 4,
		title: 'FIFA 24',
		genre: 'Sports',
		platform: 'PC,XBOX,PS',
		releaseDate: '2023',
		description:
			'Realistic football simulator with licensed teams and players.',
	},
	{
		id: 5,
		title: 'Elden Ring',
		genre: 'Action RPG',
		platform: 'PC,XBOX,PS',
		releaseDate: '2022',
		description:
			'Challenging open-world action RPG from the creators of Dark Souls.',
	},
	{
		id: 6,
		title: 'Overwatch 2',
		genre: 'FPS',
		platform: 'PC,XBOX,PS,SWITCH',
		releaseDate: '2022',
		description: 'Team-based hero shooter with new maps and modes.',
	},
];

//TODO: Fetch based on userID and use that data
//TODO: Add delete and edit options
export default function GamesPage() {
	const { userId } = useParams();

	return (
		<Box sx={{ p: 4 }}>
			<h1>Games for user: {userId}</h1>
			<Grid
				container
				spacing={2}
				alignItems='stretch'
			>
				{DUMMY_GAMES.map((game) => (
					<Grid
						item
						key={game.id}
						xs={12}
						sm={6}
						md={4}
						lg={3}
						sx={{
							display: 'flex',
						}}
					>
						<Game
							{...game}
							userId={userId}
						/>
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
			>
				<AddIcon />
			</Fab>
		</Box>
	);
}
