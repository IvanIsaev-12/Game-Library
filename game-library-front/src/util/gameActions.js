export const getMyGames = async (gamesData) => {
	const response = await fetch('http://localhost:8080/api/games/my-library', {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(gamesData),
	});

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message || 'Failed to get games');
	}
};