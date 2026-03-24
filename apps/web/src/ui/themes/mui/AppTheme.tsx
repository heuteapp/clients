"use client";

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppThemeProps } from '@/src/ui/types/theme/mui/mui.props';
import { inputsCustomizations } from '@/src/ui/themes/mui/customizations/inputs';
import { getDesignTokens } from './themePrimitives';

export function AppTheme(props: AppThemeProps) {
  const { children, themeComponents } = props;
  
  const theme = React.useMemo(() => {
    const mode = 'dark'
    
    const designTokens = getDesignTokens(mode);
    
    return createTheme({
      ...designTokens,
      components: {
        ...inputsCustomizations,
        ...(themeComponents?.components || {}),
      },
    });
  }, [themeComponents]);

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}