import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../util/register-login';
import { useNavigate } from 'react-router-dom';
import {
	Stack,
	TextField,
	Checkbox,
	FormControlLabel,
	Button,
	Typography,
	Box,
	Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CenteringBox from '../components/CenteringBox';

export default function RegisterPage() {
   const navigate = useNavigate();

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
			alert('Registration failed: ' + error.message);
		},
	});

	const onSubmit = (data) => {
		if (data.password !== data.confirmPassword) {
			alert('Passwords do not match');
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
