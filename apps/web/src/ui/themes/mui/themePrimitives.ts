import { createTheme, alpha, PaletteMode, Shadows } from '@mui/material/styles';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    highlighted: true;
  }
}
declare module '@mui/material/styles' {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}

  interface Palette {
    baseShadow: string;
  }
}

const defaultTheme = createTheme();

const customShadows: Shadows = [...defaultTheme.shadows];

export const brand = {
  50: 'hsl(210, 100%, 95%)',
  100: 'hsl(210, 100%, 92%)',
  200: 'hsl(210, 100%, 80%)',
  300: 'hsl(210, 100%, 65%)',
  400: 'hsl(210, 98%, 48%)',
  500: 'hsl(210, 98%, 42%)',
  600: 'hsl(210, 98%, 55%)',
  700: 'hsl(210, 100%, 35%)',
  800: 'hsl(210, 100%, 16%)',
  900: 'hsl(210, 100%, 21%)',
};

export const gray = {
  50: 'hsl(0, 0%, 95%)',   // was 97%
  100: 'hsl(0, 0%, 90%)',  // was 94%
  200: 'hsl(0, 0%, 82%)',  // was 88%
  300: 'hsl(0, 0%, 74%)',  // was 80%
  400: 'hsl(0, 0%, 58%)',  // was 65%
  500: 'hsl(0, 0%, 42%)',  // was 48%
  600: 'hsl(0, 0%, 32%)',  // was 38%
  700: 'hsl(0, 0%, 22%)',  // was 28%
  800: 'hsl(0, 0%, 14%)',  // was 18%
  850: 'hsl(0, 0%, 10%)',  // was 12%
  900: 'hsl(0, 0%, 8%)',   // was 10%
};

export const green = {
  50: 'hsl(145, 70%, 98%)',
  100: 'hsl(145, 65%, 94%)',
  200: 'hsl(145, 60%, 87%)',
  300: 'hsl(145, 55%, 75%)',
  400: 'hsl(145, 50%, 55%)',
  500: 'hsl(145, 60%, 40%)',
  600: 'hsl(145, 65%, 32%)',
  700: 'hsl(145, 70%, 24%)',
  800: 'hsl(145, 75%, 16%)',
  900: 'hsl(145, 80%, 10%)',
};

export const orange = {
  50: 'hsl(30, 100%, 97%)',
  100: 'hsl(30, 95%, 90%)',
  200: 'hsl(30, 90%, 80%)',
  300: 'hsl(30, 85%, 65%)',
  400: 'hsl(30, 90%, 50%)',
  500: 'hsl(30, 85%, 45%)',
  600: 'hsl(30, 80%, 38%)',
  700: 'hsl(30, 85%, 30%)',
  800: 'hsl(30, 90%, 22%)',
  900: 'hsl(30, 95%, 14%)',
};

export const red = {
  50: 'hsl(0, 85%, 97%)',
  100: 'hsl(0, 80%, 92%)',
  200: 'hsl(0, 75%, 85%)',
  300: 'hsl(0, 70%, 70%)',
  400: 'hsl(0, 75%, 55%)',
  500: 'hsl(0, 80%, 45%)',
  600: 'hsl(0, 85%, 38%)',
  700: 'hsl(0, 90%, 30%)',
  800: 'hsl(0, 92%, 22%)',
  900: 'hsl(0, 95%, 14%)',
};

export const blue = {
  50: 'hsl(210, 70%, 97%)',
  100: 'hsl(210, 65%, 92%)',
  200: 'hsl(210, 60%, 85%)',
  300: 'hsl(210, 55%, 75%)',
  400: 'hsl(210, 60%, 60%)',
  500: 'hsl(210, 70%, 50%)',
  600: 'hsl(210, 75%, 42%)',
  700: 'hsl(210, 80%, 34%)',
  800: 'hsl(210, 85%, 26%)',
  900: 'hsl(210, 90%, 18%)',
};

export const getDesignTokens = (mode: PaletteMode) => {
  customShadows[1] =
    mode === 'dark'
      ? 'hsla(40, 12%, 5%, 0.7) 0px 4px 16px 0px, hsla(40, 10%, 8%, 0.8) 0px 8px 16px -5px'
      : 'hsla(40, 15%, 10%, 0.05) 0px 4px 16px 0px, hsla(40, 12%, 15%, 0.05) 0px 8px 16px -5px';

  return {
    palette: {
      mode,
      primary: {
        light: brand[300],
        main: brand[400],
        dark: brand[700],
        contrastText: gray[50],
        ...(mode === 'dark' && {
          contrastText: gray[50],
          light: brand[300],
          main: brand[400],
          dark: brand[700],
        }),
      },
      info: {
        light: blue[300],
        main: blue[500],
        dark: blue[700],
        contrastText: gray[50],
        ...(mode === 'dark' && {
          contrastText: blue[100],
          light: blue[400],
          main: blue[600],
          dark: blue[800],
        }),
      },
      warning: {
        light: orange[300],
        main: orange[400],
        dark: orange[700],
        ...(mode === 'dark' && {
          light: orange[400],
          main: orange[500],
          dark: orange[800],
        }),
      },
      error: {
        light: red[300],
        main: red[400],
        dark: red[700],
        ...(mode === 'dark' && {
          light: red[400],
          main: red[500],
          dark: red[800],
        }),
      },
      success: {
        light: green[300],
        main: green[500],
        dark: green[700],
        ...(mode === 'dark' && {
          light: green[400],
          main: green[500],
          dark: green[800],
        }),
      },
      grey: {
        ...gray,
      },
      divider: mode === 'dark' ? alpha(gray[700], 0.8) : alpha(gray[300], 0.3),
      background: {
        default: mode === 'dark' ? gray[900] : gray[50],
        paper: mode === 'dark' ? gray[850] : gray[100],
      },
      text: {
        primary: mode === 'dark' ? gray[100] : gray[800],
        secondary: mode === 'dark' ? gray[400] : gray[600],
        disabled: mode === 'dark' ? gray[600] : gray[400],
      },
      action: {
        hover: mode === 'dark' ? alpha(gray[600], 0.3) : alpha(brand[100], 0.5),
        selected: mode === 'dark' ? alpha(gray[600], 0.4) : alpha(brand[200], 0.3),
        active: brand[400],
      },
    },
    typography: {
      fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
      h1: {
        fontSize: defaultTheme.typography.pxToRem(48),
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: -0.02,
      },
      h2: {
        fontSize: defaultTheme.typography.pxToRem(36),
        fontWeight: 600,
        lineHeight: 1.25,
        letterSpacing: -0.01,
      },
      h3: {
        fontSize: defaultTheme.typography.pxToRem(30),
        fontWeight: 500,
        lineHeight: 1.3,
      },
      h4: {
        fontSize: defaultTheme.typography.pxToRem(24),
        fontWeight: 500,
        lineHeight: 1.35,
      },
      h5: {
        fontSize: defaultTheme.typography.pxToRem(20),
        fontWeight: 500,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: defaultTheme.typography.pxToRem(18),
        fontWeight: 500,
        lineHeight: 1.45,
      },
      subtitle1: {
        fontSize: defaultTheme.typography.pxToRem(16),
        fontWeight: 400,
        lineHeight: 1.5,
      },
      subtitle2: {
        fontSize: defaultTheme.typography.pxToRem(14),
        fontWeight: 500,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: defaultTheme.typography.pxToRem(14),
        lineHeight: 1.6,
      },
      body2: {
        fontSize: defaultTheme.typography.pxToRem(13),
        fontWeight: 400,
        lineHeight: 1.6,
      },
      caption: {
        fontSize: defaultTheme.typography.pxToRem(12),
        fontWeight: 400,
        lineHeight: 1.5,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 12,
    },
    shadows: customShadows,
  };
};

export const colorSchemes = {
  light: {
    palette: {
      primary: {
        light: brand[300],
        main: brand[400],
        dark: brand[700],
        contrastText: gray[50],
      },
      info: {
        light: blue[300],
        main: blue[500],
        dark: blue[700],
        contrastText: gray[50],
      },
      warning: {
        light: orange[300],
        main: orange[400],
        dark: orange[700],
      },
      error: {
        light: red[300],
        main: red[400],
        dark: red[700],
      },
      success: {
        light: green[300],
        main: green[500],
        dark: green[700],
      },
      grey: {
        ...gray,
      },
      divider: alpha(gray[300], 0.3),
      background: {
        default: gray[50],
        paper: gray[100],
      },
      text: {
        primary: gray[800],
        secondary: gray[600],
      },
      action: {
        hover: alpha(brand[100], 0.5),
        selected: alpha(brand[200], 0.3),
        active: brand[400],
      },
      baseShadow: 'hsla(40, 15%, 10%, 0.05) 0px 4px 16px 0px, hsla(40, 12%, 15%, 0.05) 0px 8px 16px -5px',
    },
  },
  dark: {
    palette: {
      primary: {
        light: brand[300],
        main: brand[400],
        dark: brand[700],
        contrastText: gray[50],
      },
      info: {
        light: blue[400],
        main: blue[600],
        dark: blue[800],
        contrastText: blue[100],
      },
      warning: {
        light: orange[400],
        main: orange[500],
        dark: orange[800],
      },
      error: {
        light: red[400],
        main: red[500],
        dark: red[800],
      },
      success: {
        light: green[400],
        main: green[500],
        dark: green[800],
      },
      grey: {
        ...gray,
      },
      divider: alpha(gray[700], 0.4),
      background: {
        default: gray[900],
        paper: gray[800],
      },
      text: {
        primary: gray[100],
        secondary: gray[400],
      },
      action: {
        hover: alpha(gray[600], 0.3),
        selected: alpha(gray[600], 0.4),
        active: brand[400],
      },
      baseShadow: 'hsla(40, 12%, 5%, 0.7) 0px 4px 16px 0px, hsla(40, 10%, 8%, 0.8) 0px 8px 16px -5px',
    },
  },
};

export const typography = {
  fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
  h1: {
    fontSize: defaultTheme.typography.pxToRem(48),
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: -0.02,
  },
  h2: {
    fontSize: defaultTheme.typography.pxToRem(36),
    fontWeight: 600,
    lineHeight: 1.25,
    letterSpacing: -0.01,
  },
  h3: {
    fontSize: defaultTheme.typography.pxToRem(30),
    fontWeight: 500,
    lineHeight: 1.3,
  },
  h4: {
    fontSize: defaultTheme.typography.pxToRem(24),
    fontWeight: 500,
    lineHeight: 1.35,
  },
  h5: {
    fontSize: defaultTheme.typography.pxToRem(20),
    fontWeight: 500,
    lineHeight: 1.4,
  },
  h6: {
    fontSize: defaultTheme.typography.pxToRem(18),
    fontWeight: 500,
    lineHeight: 1.45,
  },
  subtitle1: {
    fontSize: defaultTheme.typography.pxToRem(16),
    fontWeight: 400,
    lineHeight: 1.5,
  },
  subtitle2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 500,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: defaultTheme.typography.pxToRem(14),
    lineHeight: 1.6,
  },
  body2: {
    fontSize: defaultTheme.typography.pxToRem(13),
    fontWeight: 400,
    lineHeight: 1.6,
  },
  caption: {
    fontSize: defaultTheme.typography.pxToRem(12),
    fontWeight: 400,
    lineHeight: 1.5,
  },
  button: {
    textTransform: 'none',
    fontWeight: 500,
  },
};

export const shape = {
  borderRadius: 12,
};

const defaultShadows = [
  'none',
  'var(--template-palette-baseShadow)',
  ...defaultTheme.shadows.slice(2),
] as Shadows;

export const shadows = defaultShadows;