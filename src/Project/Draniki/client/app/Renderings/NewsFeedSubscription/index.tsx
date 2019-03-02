import { Text } from '@sitecore-jss/sitecore-jss-react';
import * as React from 'react';

import Button from '@material-ui/core/Button';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { NewsFeedSubscriptionProps } from './models';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: '25px 0;',
    maxWidth: '200px',
  },
  input: {
    marginTop: '10px',
  },
  submitButton: {
    marginTop: '10px',
  },
};

export const NewsFeedSubscription = withStyles(styles as any)(
  ({ classes, fields }: NewsFeedSubscriptionProps & WithStyles) => {
    return (
      <form className={classes.form} noValidate={true} autoComplete="off">
        <Typography variant="h5" component="h2">
          <Text field={fields.Title} />
        </Typography>
        <TextField
          className={classes.input}
          id="standard-name"
          label={fields['Email Label'].value}
          //   value={this.state.name}
          //   onChange={this.handleChange('name')}
          // margin="normal"
        />
        <Button className={classes.submitButton} variant="contained" color="primary">
          Subscribe!
        </Button>
      </form>
    );
  }
);
