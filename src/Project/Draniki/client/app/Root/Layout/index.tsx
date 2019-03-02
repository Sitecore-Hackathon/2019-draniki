import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Query } from 'react-apollo';

import cyan from '@material-ui/core/colors/cyan';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import * as React from 'react';
import Helmet from 'react-helmet';

import themeQuery from './themeQuery.graphql';

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
  return (
    <Query query={themeQuery}>
      {({ data, loading, error }) => {
        let currentTheme = darkTheme;

        if (!loading && data) {
          const { visualization } = data;

          if (visualization.theme === 'light') {
            currentTheme = lightTheme;
          }

          if (visualization.theme === 'dark') {
            currentTheme = darkTheme;
          }
        }

        return (
          <MuiThemeProvider theme={currentTheme}>
            <Helmet title={route.name} />

            <Placeholder name="main" rendering={route} />
          </MuiThemeProvider>
        );
      }}
    </Query>
  );
};
