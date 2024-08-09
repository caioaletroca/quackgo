import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import React from 'react';
import { darkTheme } from './dark';

export type ThemeProviderProps = React.PropsWithChildren;

export function ThemeProvider({ children }: React.PropsWithChildren) {
	return (
		<MuiThemeProvider theme={darkTheme}>
			<CssBaseline />
			{children}
		</MuiThemeProvider>
	);
}
