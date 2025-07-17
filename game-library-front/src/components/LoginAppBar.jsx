import  AppBar  from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export default function LoginAppBar() {
	const { loggedIn, setLoggedIn } = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
		if (!loggedIn) {
			localStorage.clear();
			navigate('/');
		}else{
         navigate('/my-games');
      }
	}, [loggedIn, navigate]);

	function handleClick() {
      if(loggedIn){
         setLoggedIn((prev) => !prev);
      }else{
         navigate('/login');
      }
	}

	return (
		<AppBar position='static'>
			<Toolbar sx={{ justifyContent: 'flex-end' }}>
				<Button
					onClick={handleClick}
					color='secondary'
					variant='contained'
				>
					{loggedIn ? 'Logout' : 'Login'}
				</Button>
			</Toolbar>
		</AppBar>
	);
}
