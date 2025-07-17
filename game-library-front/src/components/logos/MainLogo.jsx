export default function MainLogo({ size = '50px' }) {
	return (
		<img
			src='/logos/game-console.png'
			alt='Game Console Logo'
			style={{ height: size, objectFit: 'contain' }}
		/>
	);
}
