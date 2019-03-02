import { Placeholder } from '@sitecore-jss/sitecore-jss-react';

import cyan from '@material-ui/core/colors/cyan';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import * as React from 'react';
import Helmet from 'react-helmet';

const lightTheme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: yellow,
  },
});

const darkTheme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: red,
  },
});

export const Layout = ({ route }: any) => {
  const theme = !!route ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <Helmet title={route.name} />

      <Placeholder name="main" rendering={route} />
    </MuiThemeProvider>
  );
};
