import { Text } from '@sitecore-jss/sitecore-jss-react';
import * as React from 'react';

import MaterialCard from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Field } from 'Project/Draniki/client/app/models';

const styles = {
  card: {
    maxWidth: 345,
  },
};

export interface CardProps {
  classes: any;
  title: Field<string>;
  description: Field<string>;
}

export const Card = withStyles(styles)(({ classes, title, description }: CardProps) => {
  return (
    <MaterialCard className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom={true} variant="h5" component="h4">
            <Text field={title} />
          </Typography>
          <Typography component="p">
            <Text field={description} />
          </Typography>
        </CardContent>
      </CardActionArea>
    </MaterialCard>
  );
});
