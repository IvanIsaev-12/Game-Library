import { createContext, useContext, useState, useMemo } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
	const [isDark, setIsDark] = useState(false);
	const value = useMemo(() => {
		return { isDark, setIsDark };
	}, [isDark]);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}

