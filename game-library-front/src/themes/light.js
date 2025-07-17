import { createTheme } from '@mui/material/styles';
import getCssBaselineOverrides from './CssBaselineOverride';

export const lightTheme = createTheme({
	palette: {
		mode: 'light',
	},
	...getCssBaselineOverrides(),
});
