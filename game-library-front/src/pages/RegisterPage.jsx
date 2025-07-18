import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../query/register-login';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import {
	Stack,
	TextField,
	Checkbox,
	FormControlLabel,
	Button,
	Typography,
	Box,
	Divider,
	Alert,
} from '@mui/material';

import CenteringBox from '../components/CenteringBox';

export default function RegisterPage() {
	const navigate = useNavigate();
	const [isAlert, setIsAlert] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const mutation = useMutation({
		mutationFn: registerUser,
		onSuccess: () => {
			navigate('/login');
		},
		onError: (error) => {
			setIsAlert(true);
		},
	});

	const onSubmit = (data) => {
		setIsAlert(false);
		if (data.password !== data.confirmPassword) {
         setIsAlert(true);
			return;
		}
		mutation.mutate({
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			password: data.password,
		});
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
					<p style={{ visibility: 'hidden' }}>{/*fixes error message stretching the component */}
						<Alert
							severity='error'
							onClose={() => setIsAlert(false)}
						>
							Could not register you check your credentials or try a
							different email.
						</Alert>
					</p>
					{isAlert && (
						<Alert
							severity='error'
							onClose={() => setIsAlert(false)}
						>
							Could not register you check your credentials or try a
							different email.
						</Alert>
					)}
					<h1>Register</h1>
					<Divider />
					<TextField
						label='First Name'
						{...register('firstName', {
							required: 'First name is required',
						})}
						error={!!errors.firstName}
						helperText={errors.firstName?.message}
					/>
					<TextField
						label='Last Name'
						{...register('lastName', {
							required: 'Last name is required',
						})}
						error={!!errors.lastName}
						helperText={errors.lastName?.message}
					/>
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
					<TextField
						label='Confirm Password'
						type='password'
						{...register('confirmPassword', {
							required: 'Please confirm your password',
						})}
						error={!!errors.confirmPassword}
						helperText={
							errors.confirmPassword?.message ||
							(watch('password') !== watch('confirmPassword') &&
								'Passwords do not match')
						}
					/>
					<FormControlLabel
						control={
							<Checkbox
								{...register('acceptTerms', { required: true })}
							/>
						}
						label='I accept the terms and conditions'
					/>
					{errors.acceptTerms && (
						<Typography
							variant='body2'
							color='error'
						>
							You must accept the terms
						</Typography>
					)}
					<Button
						type='submit'
						variant='contained'
						color='primary'
						disabled={mutation.isLoading}
					>
						{mutation.isLoading ? 'Registering...' : 'Submit'}
					</Button>
					<Box
						display='flex'
						justifyContent='space-between'
					>
						<Link to='/login'>Login</Link>
						<Link to='/'>Back to home page</Link>
					</Box>
				</Stack>
			</form>
		</CenteringBox>
	);
}
