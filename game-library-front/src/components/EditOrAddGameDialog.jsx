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

export default function EditOrAddGameDialog({
	open,
	onClose,
	gameId,
	title,
	genre,
	platform,
	releaseDate,
	description,
	isEditMode = true,
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: isEditMode
			? {
					Title: title,
					Genre: genre,
					Platform: platform,
					ReleaseDate: releaseDate,
					Description: description,
			  }
			: {},
	});

	function onSubmit(data) {
		console.log(data);
		// TODO: Perform mutation here
		onClose();
	}

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
					onSubmit={handleSubmit(onSubmit)}
					noValidate
				>
					<Stack spacing={2}>
						<TextField
							label='Title'
							{...register('Title', { required: 'Title is required' })}
							error={!!errors.Title}
							helperText={errors.Title?.message}
							defaultValue={isEditMode ? title : ''}
						/>
						<TextField
							label='Genre'
							{...register('Genre', { required: 'Genre is required' })}
							error={!!errors.Genre}
							helperText={errors.Genre?.message}
							defaultValue={isEditMode ? genre : ''}
						/>
						<TextField
							label='Platform'
							multiline
							rows={2}
							{...register('Platform', {
								required: 'Platform is required',
							})}
							error={!!errors.Platform}
							helperText={errors.Platform?.message}
							defaultValue={isEditMode ? platform : ''}
						/>
						<TextField
							label='Release Date'
							type='date'
							InputLabelProps={{ shrink: true }}
							{...register('ReleaseDate', {
								required: 'Release date is required',
							})}
							error={!!errors.ReleaseDate}
							helperText={errors.ReleaseDate?.message}
							defaultValue={isEditMode ? releaseDate : ''}
						/>
						<TextField
							label='Description'
							multiline
							rows={4}
							{...register('Description', {
								required: 'Description is required',
							})}
							error={!!errors.Description}
							helperText={errors.Description?.message}
							defaultValue={isEditMode ? description : ''}
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
