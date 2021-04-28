import {
  createMuiTheme, ThemeProvider
} from '@material-ui/core/styles';
import React from 'react';
import Routers from './router/Index';

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: '#0072c7',
      contrastText: '#fff',
      main: '#0A5517',
      light: '#6dd1ff'
    },
    secondary: {
      dark: '#0072c7',
      contrastText: '#fff',
      main: '#18A0FB',
      light: '#6dd1ff'
    }
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routers />
    </ThemeProvider>
  );
}

export default App;
