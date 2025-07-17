export const registerUser = async (userData) => {
	const response = await fetch('http://localhost:8080/api/auth/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(userData),
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(error);
	}
	return response.json();
};


export const loginUser = async (userData) => {
	const response = await fetch('http://localhost:8080/api/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(userData),
	});

	const responseBody = await response.json();

	if (response.ok) {
		const token = responseBody.token;
		if (token) {
			localStorage.setItem('token', token);
		}
		return responseBody;
	} else {
		throw new Error(responseBody.message || 'Login failed');
	}
};