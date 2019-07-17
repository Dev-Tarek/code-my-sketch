import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SketchIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    floatLeft: 'auto',
    marginRight: 'auto',
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
});

const getIcon = (icon, styleClass) => {
  if(icon === 'sketch') return <SketchIcon className={styleClass} />
  else if(icon === 'add') return <AddIcon className={styleClass} />
}

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar color={props.color} position="static">
        <Toolbar>
          <Typography variant="h5" color="inherit" className={classes.grow}>
            {props.title}
          </Typography>
          {props.buttons.map((button, index) => {
            return <Button key={uuid()} color="inherit" onClick={() => props.handler(index)}>
              {getIcon(button.icon, classes.leftIcon)} {button.label}
            </Button>
          })}
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);