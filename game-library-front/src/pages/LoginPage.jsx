import { Box, TextField, Button, Stack, Divider, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { loginUser } from '../query/register-login';
import { useAuth } from '../contexts/AuthContext';
import CenteringBox from '../components/CenteringBox';

export default function LoginPage() {
	const [isAlert, setIsAlert] = useState(false);
	const navigate = useNavigate();
	const { setLoggedIn } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const mutation = useMutation({
		mutationFn: loginUser,
		onSuccess: (data) => {
			setLoggedIn(true);
			navigate('/');
		},
		onError: (error) => {
			setIsAlert(true);
		},
	});

	const onSubmit = (data) => {
      setIsAlert(false)
		mutation.mutate(data);
	};

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
					{isAlert && (
						<Alert
							severity='error'
							onClose={() => setIsAlert(false)}
						>
							Could not log you in.
						</Alert>
					)}
					<h1>Login to your account</h1>
					<Divider />

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
						disabled={mutation.isPending}
					>
						{mutation.isPending ? 'Logging in...' : 'Login'}
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
