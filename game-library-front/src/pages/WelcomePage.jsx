import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useAuth } from '../contexts/AuthContext';
import MainLogo from '../components/logos/MainLogo';
import CenteringBox from '../components/CenteringBox';

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
		<CenteringBox scale={1.3}>
			<Stack
				spacing={2}
				alignItems='center'
				justifyContent={'center'}
			>
				<MainLogo size='250px' />
				<h1>Welcome to Game Library</h1>
				<Button
					onClick={loginButtonHandler}
					variant='contained'
				>
					Login
				</Button>
			</Stack>
		</CenteringBox>
	);
}
