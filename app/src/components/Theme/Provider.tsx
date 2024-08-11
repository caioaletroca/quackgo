import { CssBaseline, ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material';
import React from 'react';
import { darkTheme } from './dark';

export type ThemeProviderProps = React.PropsWithChildren;

export function ThemeProvider({ children }: React.PropsWithChildren) {
	return (
        <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={darkTheme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </StyledEngineProvider>
	);
}
