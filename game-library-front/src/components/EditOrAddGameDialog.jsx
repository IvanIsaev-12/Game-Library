import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	Stack,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function EditOrAddGameDialog({
	open,
	onClose,
	onSubmit, 
	gameId,
	title,
	genre,
	platform,
	releaseDate,
	description,
	imageUrl,
	isEditMode = true,
}) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: '',
			genre: '',
			platform: '',
			releaseDate: '',
			description: '',
			imageUrl: '',
		},
	});

	// Populate form with initial values on dialog open
	useEffect(() => {
		if (open && isEditMode) {
			reset({
				title,
				genre,
				platform,
				releaseDate,
				description,
				imageUrl,
			});
		}
	}, [
		open,
		isEditMode,
		reset,
		title,
		genre,
		platform,
		releaseDate,
		description,
		imageUrl,
	]);

	const handleFormSubmit = (data) => {
		onSubmit?.(data);
		onClose();
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth='md'
		>
			<DialogTitle>
				{isEditMode ? `Edit Game: ${gameId}` : 'Add New Game'}
			</DialogTitle>

			<DialogContent dividers>
				<form
					id='edit-game-form'
					onSubmit={handleSubmit(handleFormSubmit)}
					noValidate
				>
					<Stack spacing={2}>
						<TextField
							label='Title'
							{...register('title', { required: 'Title is required' })}
							error={!!errors.title}
							helperText={errors.title?.message}
						/>
						<TextField
							label='Genre'
							{...register('genre', { required: 'Genre is required' })}
							error={!!errors.genre}
							helperText={errors.genre?.message}
						/>
						<TextField
							label='Platform'
							{...register('platform', {
								required: 'Platform is required',
							})}
							error={!!errors.platform}
							helperText={errors.platform?.message}
						/>
						<TextField
							label='Release Date'
							type='date'
							InputLabelProps={{ shrink: true }}
							{...register('releaseDate', {
								required: 'Release date is required',
							})}
							error={!!errors.releaseDate}
							helperText={errors.releaseDate?.message}
						/>
						<TextField
							label='Description'
							multiline
							rows={4}
							{...register('description', {
								required: 'Description is required',
							})}
							error={!!errors.description}
							helperText={errors.description?.message}
						/>
						<TextField
							label='Image URL'
							{...register('imageUrl')}
						/>
					</Stack>
				</form>
			</DialogContent>

			<DialogActions>
				<Button
					onClick={onClose}
					color='error'
				>
					Cancel
				</Button>
				<Button
					type='submit'
					form='edit-game-form'
					variant='contained'
					color='primary'
				>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
}
