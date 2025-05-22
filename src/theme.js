import { createTheme } from '@mui/material'

const theme = createTheme({
  cssVariables: true,
  palette: {
    secondary: {
      main: '#8598AE'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  }
})

export default theme