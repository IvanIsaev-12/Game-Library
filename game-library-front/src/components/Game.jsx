import { Card, CardContent, Typography } from '@mui/material';

export default function Game({
	title,
	genre,
	platform,
	releaseDate,
	description,
}) {
	return (
		<Card
			variant='outlined'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '25rem',
			}}
		>
			<CardContent sx={{ flexGrow: 1 }}>
				<Typography
					variant='h5'
					component='div'
					gutterBottom
				>
					{title}
				</Typography>
				<Typography color='text.secondary'>Genre: {genre}</Typography>
				<Typography color='text.secondary'>Platform: {platform}</Typography>
				<Typography color='text.secondary'>
					Released: {releaseDate}
				</Typography>
				<Typography
					variant='body2'
					mt={1}
				>
					{description}
				</Typography>
			</CardContent>
		</Card>
	);
}