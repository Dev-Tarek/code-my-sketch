import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Drawer, withStyles, CssBaseline, Divider, FormGroup, FormControlLabel, Checkbox, IconButton, Button } from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import uuid from 'uuid';

import Panel from '../layouts/ExpansionPanel';
import Select from '../layouts/Select';
import Textfield from '../layouts/Textfield';
import Counter from '../layouts/Counter';
import { isArray, isString } from 'util';

import DownloadLink from "react-download-link";
import { stringify } from 'css';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    // whiteSpace: 'nowrap',
    overflow: 'visible',
  },
  drawerOpen: {
    width: drawerWidth,
    overflow: 'visible',
    transition: theme.transitions.create(['width', 'left'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    overflow: 'visible',
    transition: theme.transitions.create(['width', 'left'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  
  drawerOpenLeft: { left: 0 },
  drawerCloseLeft: { left: '-73px' },
  
  drawerOpenRight: { right: 0 },
  drawerCloseRight: { right: '-73px' },
  
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    position: 'relative',
    ...theme.mixins.toolbar,
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  optionButton: {
    margin: theme.spacing(2),
    justifyContent: 'center',
    alignSelf: 'center'
  },
  toggleButton: {
    outline: 'none',
    position: 'relative',
    padding: '6px',  
    borderRadius: '4px',
    background: 'white',
    '&:hover': {
      background: '#fafafa',
    },
  },
  toggleButtonRight: {
    right: '40px',
  },
  toggleButtonLeft: {
    left: '40px',
  }
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
    direction: 'left',
    switch: false,
  };
 

  toggleDirectionSwitch = name => event => {
    this.setState({ [name]: event.target.checked });
    let temp = null;
    this.state.direction === 'left' ? temp = 'right' : temp = 'left';
    this.setState({ direction: temp });
  };

  toggleDrawer = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };


  getValue=(parent,label,styleDeclarations)=>{	
    let key = parent + '-' + label;
    let index = styleDeclarations? styleDeclarations.findIndex(dec => dec['property'] === key) : -1;
    let value = index > -1? styleDeclarations[index].value : '';
    return value
  }
  
  saveFunction = () => {
    const style = this.props.style;
    style.stylesheet.rules.splice(0, 1);
    style.stylesheet.rules.splice(2, 1);
    const stylesheet = stringify(style);

    return `<!DOCTYPE html>
      <html>
        <head>
          <title>Generated Page</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
          <style>
            ${stylesheet}
          </style>
        </head>
        <body>
          ${this.props.page()}
          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        </body>
      </html>`;
  }

  render() {
    
    const { classes } = this.props;
    let buttonPlacement = this.state.direction === 'left' ? 'flex-end' : 'flex-start';
    
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          anchor={this.state.direction}
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,

            [classes.drawerOpenRight]: this.state.open && this.state.direction === 'right',
            [classes.drawerCloseRight]: !this.state.open && this.state.direction === 'right',
            [classes.drawerOpenLeft]: this.state.open && this.state.direction === 'left',
            [classes.drawerCloseLeft]: !this.state.open && this.state.direction === 'left',
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
              
              [classes.drawerOpenRight]: this.state.open && this.state.direction === 'right',
              [classes.drawerCloseRight]: !this.state.open && this.state.direction === 'right',
              [classes.drawerOpenLeft]: this.state.open && this.state.direction === 'left',
              [classes.drawerCloseLeft]: !this.state.open && this.state.direction === 'left',
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar} style={{justifyContent: buttonPlacement}} >
            <IconButton 
              className={classNames(classes.toggleButton, {
                [classes.toggleButtonLeft]: this.state.direction === 'left',
                [classes.toggleButtonRight]: this.state.direction === 'right',
              })}
              onClick={this.toggleDrawer} >
                {
                (this.state.open && this.state.direction === 'left') ||
                (!this.state.open && this.state.direction === 'right')?
                    <ChevronLeftIcon /> : <ChevronRightIcon /> 
                }
            </IconButton>
          </div>
          <Divider />
          <FormGroup row style={{justifyContent: 'center'}}>
            <FormControlLabel
                style={{margin: 0}}
                control={
                    <Checkbox
                        checked={this.state.switch}
                        onChange={this.toggleDirectionSwitch('switch')}
                        value="switch"
                        color="primary"
                        style={{padding: '8px 2px 8px 2px'}}
                    />
                }
                label='Right'
            />
          </FormGroup>
          {this.props.id?
            <div style={{padding: '6px', overflowX: 'hidden'}}>
                
              {Object.keys(this.props.tagAttributes).map(key => 
                <Panel key={uuid()} label={key} expanded={this.props.expandedPanel === key} handler={this.props.expansionHandler}>
                  <form key={uuid()} className={classes.form} noValidate autoComplete="off">
                    {Object.keys(this.props.tagAttributes[key]).map(keyAttr => {
                        return isArray(this.props.tagAttributes[key][keyAttr])?
                        <Select
                          key={uuid()}
                          parent={key}
                          label={keyAttr}
                          values={this.props.tagAttributes[key][keyAttr]}
                          editHandler={this.props.editHandler}
                          styleDeclarations={this.props.styleDeclarations}
                        />
                        : isString(this.props.tagAttributes[key][keyAttr])?
                          <Textfield 
							  key={uuid()}
							  parent={key}
							  label={keyAttr}     
							  value= {this.getValue(key,keyAttr,this.props.styleDeclarations)}
							  editHandler={this.props.editHandler}
							  styleDeclarations={this.props.styleDeclarations}                       
                          />
                          : <Counter
							  key={uuid()}
							  parent={key}
							  label={keyAttr}
							  editHandler={this.props.editHandler}
							  styleDeclarations={this.props.styleDeclarations}
							/>
                      }
                    )}
                  </form>
                </Panel>
              )}
            </div>
            :
            <p style={{textAlign: 'center'}}>Please select an element.</p>}
            
            <DownloadLink 
              style={{}}
              tagName="button"
              className={classes.optionButton + ' btn btn-info'} 
              label="Save" 
              filename="generated_page.html" 
              exportFile={this.saveFunction} 
            />
            <Button variant='outlined' className={classes.optionButton} onClick={()=>this.props.viewHandler('transition', -1)}>
              Back Home
            </Button>
        </Drawer>

      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);