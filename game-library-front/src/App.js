import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';


import WelcomePage from './pages/WelcomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import GamesPage from './pages/GamesPage.jsx';

import Layout from './layouts/Layout.jsx';
import { AuthProvider } from './contexts/AuthContext';

import { darkTheme } from './themes/dark';
import { lightTheme } from './themes/light';

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

function AppThemeWrapper({ children }) {
	const { isDark } = useTheme();
	const activeTheme = isDark ? darkTheme : lightTheme;
	return <MUIThemeProvider theme={activeTheme}>{children}</MUIThemeProvider>;
}


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
