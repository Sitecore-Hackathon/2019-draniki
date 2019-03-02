import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Subscription } from 'react-apollo';

import cyan from '@material-ui/core/colors/cyan';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';

import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';

import * as React from 'react';
import Helmet from 'react-helmet';

import themeSubscription from './themeSubscription.graphql';

const styles = {
  darkThemeBackground: {
    backgroundColor: '#6573c3',
  },
  lightThemeBackground: {
    backgroundColor: '#33eaff',
  },
};

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

export const Layout = withStyles(styles)(({ classes, route }: any) => {
  return (
    <Subscription subscription={themeSubscription}>
      {({ data, loading, error }) => {
        let currentTheme = darkTheme;
        let defaultBackgroundClass = classes.darkThemeBackground;

        if (!loading && data) {
          const { visualizationSubscription } = data;

          if (visualizationSubscription.themeChanged === 'light') {
            currentTheme = lightTheme;
            defaultBackgroundClass = classes.lightThemeBackground;
          }

          if (visualizationSubscription.themeChanged === 'dark') {
            currentTheme = darkTheme;
            defaultBackgroundClass = classes.darkThemeBackground;
          }
        }

        return (
          <MuiThemeProvider theme={currentTheme}>
            <Helmet title={route.name} />
            <div className={defaultBackgroundClass}>
              <Placeholder name="main" rendering={route} />
            </div>
          </MuiThemeProvider>
        );
      }}
    </Subscription>
  );
});
