import { Button, Stack, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import { useEffect } from 'react';

export default function WelcomePage() {
	const navigate = useNavigate();
	const { loggedIn } = useAuth();
	function loginButtonHandler() {
		navigate('/login');
	}

	useEffect(() => {
		if (loggedIn) {
			navigate('/my-games');
		}
	}, [loggedIn, navigate]); 

	return (
		<Box
			height='100vh'
			display='flex'
			justifyContent='center'
			alignItems='center'
		>
			<Stack
				spacing={2}
				alignItems='center'
				justifyContent={'center'}
			>
				<h1>Welcome to Game Library</h1>
				<Button
					onClick={loginButtonHandler}
					variant='contained'
				>
					Login
				</Button>
			</Stack>
		</Box>
	);
}
