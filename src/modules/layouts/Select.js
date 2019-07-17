import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '-webkit-fill-available',
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class OutlinedTextFields extends React.Component {
  state = {
      value: '',
  };

  handleChange = event => {
    let key = this.props.parent + '-' + this.props.label;
    this.props.editHandler(key, event.target.value);
  };

  render() {
    const { classes, styleDeclarations } = this.props;
    let key = this.props.parent + '-' + this.props.label;
    let index = styleDeclarations? styleDeclarations.findIndex(dec => dec['property'] === key) : -1;
    let value = index > -1? styleDeclarations[index].value : '';

    return (
        <TextField
          select
          label={this.props.label}
          className={classes.textField}
          value={value}
          onChange={this.handleChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
          variant="outlined"
        >
          {this.props.values.map(value => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);
