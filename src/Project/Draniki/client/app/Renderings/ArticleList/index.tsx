import { Text } from '@sitecore-jss/sitecore-jss-react';
import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Card } from './components';
import { ArticleListProps } from './models';

const styles = {
  list: {
    margin: '25px 0',
  },
};

export const ArticleList = withStyles(styles)(({ classes, fields }: ArticleListProps) => {
  return (
    <Grid className={classes.list} container={true} direction="row" justify="center" alignItems="center">
      <Grid item={true} xs={4} md={8} lg={12}>
        <Typography gutterBottom={true} variant="h5" component="h2">
          <Text field={fields.Title} />
        </Typography>
      </Grid>
      <Grid container={true} spacing={24}>
        {fields.Articles.map(({ fields: articleFields }, index) => (
          <Grid item={true} xs={4} md={8} lg={3} key={index}>
            <Card title={articleFields.Title} description={articleFields.Description} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
});
