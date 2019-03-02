import React from 'react';

import MaterialAppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  // tslint:disable-next-line:object-literal-sort-keys
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

export const AppBar = withStyles(styles)((props: any) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <MaterialAppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </MaterialAppBar>
    </div>
  );
});
