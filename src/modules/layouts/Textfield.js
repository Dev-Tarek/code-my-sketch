import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FormGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
});



class OutlinedTextFields extends React.Component {
  state = {
    value: this.props.value,
    
  };

  handleChange =(event)=> {
    this.setState({
      value: event.target.value,
    });
    
  };


  handleClick=(event)=>{
    let key = this.props.parent + '-' + this.props.label;

    this.props.editHandler(key, this.state.value);
  }

  render() {
    const {classes} = this.props;
  
    return <FormGroup >
  
    <TextField
                id="outlined"
                label={this.props.label}
                className={classes.textField}
                value={this.state.value}
                onChange={this.handleChange}
                margin="none"
                variant="outlined"
                style={{display: 'block'}}
            />

            <Button color="primary" className={classes.button} onClick={this.handleClick}>
              Apply
            </Button>

        </FormGroup>
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);
