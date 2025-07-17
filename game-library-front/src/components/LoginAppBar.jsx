// LoginAppBar.jsx
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ModeSwitch } from './ModeSwitch';
import MainLogo from './logos/MainLogo';

export default function LoginAppBar() {
	const { loggedIn, setLoggedIn } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!loggedIn) {
			localStorage.clear();
			navigate('/');
		} else {
			navigate('/my-games');
		}
	}, [loggedIn, navigate]);

	function handleClick() {
		if (loggedIn) {
			setLoggedIn((prev) => !prev);
		} else {
			navigate('/login');
		}
	}

	return (
		<AppBar position='fixed'>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<MainLogo />
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<ModeSwitch />
					<Button
						onClick={handleClick}
						color='secondary'
						variant='contained'
					>
						{loggedIn ? 'Logout' : 'Login'}
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
