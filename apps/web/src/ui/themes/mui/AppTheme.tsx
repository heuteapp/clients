"use client";

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppThemeProps } from '@/src/ui/types/theme/mui/mui.props';
import { inputsCustomizations } from '@/src/ui/themes/mui/customizations/inputs';

export function AppTheme(props: AppThemeProps) {
  const { children, themeComponents } = props;
  const theme = React.useMemo(() => {
    return createTheme({
      palette: {
        mode: 'dark',
      },
      components: {
        ...inputsCustomizations,
      }
    });
  }, [themeComponents]);

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
