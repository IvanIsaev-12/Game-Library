// src/components/Layout.jsx
import LoginAppBar from '../components/LoginAppBar';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

export default function Layout() {
	return (
		<>
			<LoginAppBar />
			<Box >
				<Outlet />
			</Box>
		</>
	);
}
