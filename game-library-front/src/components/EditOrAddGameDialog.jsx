import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	Stack,
	Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import PlatformMultiSelect from './PlatformMultiSelect';

const predefinedImages = [
	'/DummyImages/img.jpg',
	'DummyImages/csgo.jpg',
	'DummyImages/terraria.jpg',
	'DummyImages/mc.jpg',
	'DummyImages/ac.jpg',
	'DummyImages/repo.jpg',
	'DummyImages/tabletop.jpg',
	'DummyImages/dirt.jpg',
	'DummyImages/satisfactory.jpg',
	'DummyImages/dota.jpg',
	'DummyImages/lol.jpg',
	'DummyImages/gta.jpg',
];

const allPlatforms = ['PC', 'PS5','PS4','Xbox One', 'Xbox Series S/X', 'Switch','Switch2', 'Mobile'];

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
		setValue,
		watch,
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

	const selectedImage = watch('imageUrl');

	useEffect(() => {
		if (open) {
			reset({
				title: title || '',
				genre: genre || '',
				platform: platform || '',
				releaseDate: releaseDate || '',
				description: description || '',
				imageUrl: imageUrl || '',
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

	const handleImageSelect = (url) => {
		setValue('imageUrl', url, { shouldValidate: true });
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
						{/* <TextField
							label='Platform'
							{...register('platform', {
								required: 'Platform is required',
							})}
							error={!!errors.platform}
							helperText={errors.platform?.message}
						/> */}

						<PlatformMultiSelect
							name='platform'
							label='Platform'
							options={allPlatforms}
							value={watch('platform')}
							onChange={(val) =>
								setValue('platform', val, { shouldValidate: true })
							}
							error={errors.platform?.message}
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

						<Typography variant='subtitle1'>Choose an Image</Typography>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns:
									'repeat(auto-fill, minmax(120px, 1fr))',
								gap: '12px',
							}}
						>
							{predefinedImages.map((url) => (
								<img
									key={url}
									src={url}
									alt='preview'
									onClick={() => handleImageSelect(url)}
									style={{
										cursor: 'pointer',
										border:
											selectedImage === url
												? '3px solid #1976d2'
												: '2px solid #ccc',
										borderRadius: '6px',
										width: '100%',
										height: 100,
										objectFit: 'cover',
									}}
								/>
							))}
						</div>

						<TextField
							InputLabelProps={{ shrink: true }}
							label='Or paste custom Image URL'
							{...register('imageUrl')}
							helperText='Overrides selection if filled.'
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
