import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import WelcomePage from './pages/WelcomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import GamesPage from './pages/GamesPage.jsx';

import { AuthProvider } from './contexts/AuthContext';


const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: '/',
		element: <WelcomePage />,
		errorElement: <WelcomePage />,
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/register',
		element: <RegisterPage />,
	},
	{
		path: '/games/:userId',
		element: <GamesPage />,
	},
]);

function App() {
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</AuthProvider>
	);
}

export default App;
