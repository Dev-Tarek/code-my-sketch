import React, { Component } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper';
import { CSSTransition } from "react-transition-group";
import AnimateHeight from 'react-animate-height';

import Appbar from '../layouts/ButtonsAppbar';
import UploadComponent from '../components/Upload';
import SketchCanvas from '../components/Sketch';
import { dataURLtoFile } from '../../assets/functions';

export default class extends Component{

    state = {
      viewUpload: true,
      viewSketch: false,
      height: 'auto',
      file: '',
      loaded: 0,
      endpoint: 'http://192.168.0.101:80/model',
    }

    componentDidMount = () => {
      const body = document.getElementsByTagName('body')[0];
      body.style.background = 'url(img/BG.jpg)';
      body.style.backgroundSize = 'cover';
      body.style.backgroundRepeat = 'repeat';
    }

    navButtonClickHandler = buttonIndex => {
        if(buttonIndex === 1){
          this.setState({viewSketch: false, height: 0});
          setTimeout(() => {
            this.setState({viewUpload: true, height: 'auto'});
          }, 350)
        }
        else if(buttonIndex === 0){
          this.setState({viewUpload: false, height: 0});
          setTimeout(() => {
            this.setState({viewSketch: true, height: 'auto'});
          }, 350)
        }
    }

    selectButtonHandler = e => {      
      if(e.target.files[0] !== 'undefined')
        this.setState({file: e.target.files[0]});
      else
        this.setState({file: null});
    }

    clearSelectedHandler = () => {
      this.setState({
        file: '',
        loaded: 0,
      })
    }

    sendButtonHandler = (sketch) => {
        const url = this.state.endpoint;
        const formData = new FormData();
        sketch?
          formData.append('image', dataURLtoFile(sketch, 'sketch.jpg')) : formData.append('image', this.state.file);
        axios
        .post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: ProgressEvent => {this.setState({
                loaded: (ProgressEvent.loaded / ProgressEvent.total * 100)
              }) 
            }
        })
        .then(res => {
          console.log('Server success:', res)
          this.props.viewHandler('transition', res);
        })
        .catch(error => {console.log(error.response)});
    }

    render() {
        
      const { selectedTab, file, loaded } = this.state;

      return (
        <Grid container>
          <Grid item md={2} />
          <Grid item xs={12} md={8}>
              <Appbar
                color='primary' 
                title='CodeSketch' 
                buttons={[{label: 'Sketch', icon: 'sketch'}, {label: 'Upload', icon: 'add'}]}
                handler={this.navButtonClickHandler} 
                selected={selectedTab}
              />
              <AnimateHeight
                duration={ 500 }
                height={this.state.height}
              >
              <Paper>
                <CSSTransition
                  in={this.state.viewUpload}
                  timeout={300}
                  classNames="alert"
                  unmountOnExit
                >
                  <UploadComponent
                    helpText='Select web design image to be converted to code'
                    selectHandler={this.selectButtonHandler}
                    clearHandler={this.clearSelectedHandler}
                    uploadHandler={this.sendButtonHandler}
                    file={file}
                    loaded={loaded}
                  />
                </CSSTransition>

                <CSSTransition
                  in={this.state.viewSketch}
                  timeout={300}
                  classNames="alert"
                  unmountOnExit
                >
                  <SketchCanvas convertHandler={this.sendButtonHandler} />
                </CSSTransition>
              </Paper>
              </AnimateHeight>
              <p>Done by Ghosts.</p>
          </Grid>
          <Grid item md={2} />
        </Grid>
      );
    }
}