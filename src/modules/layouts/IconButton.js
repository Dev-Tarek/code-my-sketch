import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
});

function IconButton(props) {
    const { classes } = props;
    return (
        <Button 
          disabled={props.disabled} 
          variant="contained" 
          color="primary"
          className={classes.button}
          onClick={props.handler}>
            {props.label}
            <SendIcon className={classes.rightIcon} />
        </Button>
        );
}

IconButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconButton);