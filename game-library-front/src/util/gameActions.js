export const getMyGames = async () => {
	const token = localStorage.getItem('token');

	const response = await fetch('http://localhost:8080/api/games/my-library', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message || 'Failed to fetch games');
	}

	return responseBody;
};
