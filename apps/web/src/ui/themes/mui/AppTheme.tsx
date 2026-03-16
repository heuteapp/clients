import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppThemeProps } from '@/src/ui/types/theme/mui/mui.props';

export default function AppTheme(props: AppThemeProps) {
  const { children, themeComponents } = props;
  const theme = React.useMemo(() => {
    return createTheme({});
  }, [themeComponents]);

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
