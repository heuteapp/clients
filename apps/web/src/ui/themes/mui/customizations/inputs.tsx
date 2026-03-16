import { Components, Theme } from '@mui/material/styles';
import { gray, brand } from '../themePrimitives';

export const inputsCustomizations: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: 'none',
        padding: '8px 16px',
        backgroundColor: brand[500],
        color: 'white',
        '&:hover': {
          backgroundColor: brand[600],
        },
        '&:active': {
          backgroundColor: brand[700],
        },
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      size: 'small',
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: '8px',
      },      
      input: {
        padding: '8px 8px',
        lineHeight: 1.2,
        fontSize: '0.875rem',
      }
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        width: 16,
        height: 16,
        color: brand[500],
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        fontSize: '0.875rem',
        marginBottom: 4,
      },
    },
  },
};