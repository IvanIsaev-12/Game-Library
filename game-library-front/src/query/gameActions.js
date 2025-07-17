export const getMyGames = async () => {
	const token = localStorage.getItem('token');

	const response = await fetch('http://localhost:8080/api/games/my-library', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message || 'Failed to fetch games');
	}

	return responseBody;
};


export const getMyGameById = async (gameId) => {
	const token = localStorage.getItem('token');

	const response = await fetch(
		`http://localhost:8080/api/games/my-library/${gameId}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		},
	);

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message || 'Failed to fetch the game');
	}

	return responseBody;
};

export const updateGame = async ({ gameId, gameData }) => {
	const token = localStorage.getItem('token');

	const response = await fetch(
		`http://localhost:8080/api/games/my-library/${gameId}`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(gameData),
		},
	);

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message || 'Failed to update game');
	}

	return responseBody;
};

export const addGame = async (gameData) => {
	const token = localStorage.getItem('token');
   console.log(gameData);
	const response = await fetch('http://localhost:8080/api/games/my-library', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(gameData),
	});

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message || 'Failed to add game');
	}

	return responseBody;
};

export const deleteGame = async (gameId) => {
	const token = localStorage.getItem('token');

	const response = await fetch(
		`http://localhost:8080/api/games/my-library/${gameId}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);

	if (!response.ok) {
		const responseBody = await response.json();
		throw new Error(responseBody.message || 'Failed to delete game');
	}

	return true; // success indicator
};
