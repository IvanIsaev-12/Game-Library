import { Box, TextField, Button, Stack, Divider } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import {useAuth} from '../contexts/AuthContext';
import CenteringBox from '../components/CenteringBox';



//TODO: add http actions
export default function LoginPage() {
   const navigate = useNavigate();
   const {setLoggedIn} = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	function onSubmit(data) {
		console.log(data);


      setLoggedIn(true);
      navigate('/');
	}

	return (
		<CenteringBox>
			<form
				onSubmit={handleSubmit(onSubmit)}
				noValidate
				autoComplete='off'
			>
				<Stack
					direction='column'
					spacing={2}
				>
					<h1>Login to your account</h1>
					<Divider></Divider>
					<TextField
						label='Email'
						type='email'
						{...register('email', {
							required: 'Email is required',
							validate: (value) =>
								value.includes('@') || 'Invalid email format',
						})}
						error={!!errors.email}
						helperText={errors.email?.message}
					/>

					<TextField
						label='Password'
						type='password'
						{...register('password', {
							required: 'Password is required',
						})}
						error={!!errors.password}
						helperText={errors.password?.message}
					/>
					<Button
						type='submit'
						variant='contained'
						color='primary'
					>
						Login
					</Button>
					<Box
						display='flex'
						justifyContent='space-between'
					>
						<Link to='/register'>Register</Link>
						<Link to='/'>Back to home page</Link>
					</Box>
				</Stack>
			</form>
		</CenteringBox>
	);
}
