"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export default function HeuteProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}

const theme = createTheme({
    palette: {
        mode: "dark",
    }
});