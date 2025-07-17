import { addGame } from '../query/gameActions.js';

//Ai generated

const predefinedImages = [
	'/DummyImages/img.jpg',
	'DummyImages/csgo.jpg',
	'DummyImages/terraria.jpg',
	'DummyImages/mc.jpg',
	'DummyImages/ac.jpg',
	'DummyImages/repo.jpg',
	'DummyImages/tabletop.jpg',
	'DummyImages/dirt.jpg',
	'DummyImages/satisfactory.jpg',
	'DummyImages/dota.jpg',
	'DummyImages/lol.jpg',
	'DummyImages/gta.jpg',
];

const titles = [
	'Rainbow Six',
	'Counter-Strike: Global Offensive',
	'Terraria',
	'Minecraft',
	'Assassin’s Creed',
	'R.E.P.O.',
	'Tabletop Simulator',
	'DiRT',
	'Satisfactory',
	'Dota 2',
	'League of Legends',
	'GTA V',
];

const genres = [
	'Action',
	'Shooter',
	'Adventure',
	'RPG',
	'Strategy',
	'Racing',
	'Simulation',
];

const platforms = ['PC', 'PS5', 'Xbox', 'Switch'];

const randomDate = () => {
	const start = new Date(2005, 0, 1).getTime();
	const end = new Date(2022, 0, 1).getTime();
	return new Date(start + Math.random() * (end - start))
		.toISOString()
		.split('T')[0];
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export async function generateAndAddDummyGames() {
	for (let i = 0; i < predefinedImages.length; i++) {
		const game = {
			title: titles[i] || `Game #${i + 1}`,
			genre: getRandom(genres),
			platform: getRandom(platforms),
			releaseDate: randomDate(),
			description: `This is a randomly generated description for ${
				titles[i] || 'a game'
			}.`,
			imageUrl: predefinedImages[i],
		};

		try {
			await addGame(game);
			console.log(`✅ Added: ${game.title}`);
		} catch (error) {
			console.error(`❌ Failed to add ${game.title}:`, error.message);
		}
	}
}

export const deleteAllDummyGames = async () => {
	const token = localStorage.getItem('token');
	if (!token) {
		console.error('No token found. User might not be logged in.');
		return;
	}

	try {
		// Fetch all games
		const response = await fetch(
			'http://localhost:8080/api/games/my-library',
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		if (!response.ok) {
			throw new Error('Failed to fetch games');
		}

		const games = await response.json();

		// Delete each game
		for (const game of games) {
			const deleteRes = await fetch(
				`http://localhost:8080/api/games/my-library/${game.id}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			if (!deleteRes.ok) {
				console.warn(`Failed to delete game with id ${game.id}`);
			}
		}

		console.log('All dummy games deleted!');
	} catch (error) {
		console.error('Error deleting dummy games:', error.message);
	}
};
