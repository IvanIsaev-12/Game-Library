import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
      element: <RegisterPage/>
   },
   {
      path: '/games/:userId',
      element: <GamesPage/>
   }
]);

function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router}>
				<QueryClientProvider client={queryClient}></QueryClientProvider>;
			</RouterProvider>
		</AuthProvider>
	);
}

export default App;
