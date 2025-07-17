import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { useTheme } from '../contexts/ThemeContext';

import { darkTheme } from './dark';
import { lightTheme } from './light';

export default function AppThemeWrapper({ children }) {
	const { isDark } = useTheme();
	const activeTheme = isDark ? darkTheme : lightTheme;
	return <MUIThemeProvider theme={activeTheme}>{children}</MUIThemeProvider>;
}