import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

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
   }
]);

function App() {
	return (
		<RouterProvider router={router}>
			<QueryClientProvider client={queryClient}></QueryClientProvider>;
		</RouterProvider>
	);
}

export default App;
