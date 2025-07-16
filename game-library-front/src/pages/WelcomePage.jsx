import { Button, Stack, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


//TODO add http actions
export default function WelcomePage() {
	const navigate = useNavigate();
	function loginButtonHandler() {
		navigate('/login');
	}
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
