import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';


import WelcomePage from './pages/WelcomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import GamesPage from './pages/GamesPage.jsx';
import Layout from './layouts/Layout.jsx';

import { AuthProvider } from './contexts/AuthContext';
import AppThemeWrapper from './themes/AppThemeWrapper';



const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <WelcomePage />,
			},
			{
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: 'register',
				element: <RegisterPage />,
			},
			{
				path: 'my-games',
				element: <GamesPage />,
			},
		],
	},
]);




function App() {
	return (
		<ThemeProvider>
			<AppThemeWrapper>
				<CssBaseline />
				<AuthProvider>
					<QueryClientProvider client={queryClient}>
						<RouterProvider router={router} />
					</QueryClientProvider>
				</AuthProvider>
			</AppThemeWrapper>
		</ThemeProvider>
	);
}

export default App;
