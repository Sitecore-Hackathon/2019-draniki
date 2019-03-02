import { Text } from '@sitecore-jss/sitecore-jss-react';
import * as React from 'react';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { NewsFeedSubscriptionProps } from './models';

export const NewsFeedSubscription = ({ fields }: NewsFeedSubscriptionProps) => {
  return (
    <form noValidate={true} autoComplete="off">
      <Typography variant="h5" component="h2">
        <Text field={fields.Title} />
      </Typography>
      <TextField
        id="standard-name"
        label={fields['Email Label'].value}
        //   value={this.state.name}
        //   onChange={this.handleChange('name')}
        margin="normal"
      />
    </form>
  );
};
