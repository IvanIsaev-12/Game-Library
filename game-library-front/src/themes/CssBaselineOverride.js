export default function getCssBaselineOverrides() {
	return {
		components: {
			MuiCssBaseline: {
				styleOverrides: {
					body: {
						overflowX: 'hidden',
						boxSizing: 'border-box',
						margin: 0,
						padding: 0,
					},
					html: {
						boxSizing: 'border-box',
						margin: 0,
						padding: 0,
					},
				},
			},
		},
	};
}
