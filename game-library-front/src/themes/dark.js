import { createTheme } from '@mui/material/styles';
import getCssBaselineOverrides from './CssBaselineOverride';

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
   ...getCssBaselineOverrides(),
});