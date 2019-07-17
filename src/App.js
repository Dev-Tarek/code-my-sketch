import React, { Component } from 'react';
// import { Switch, Route, withRouter } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";

import Home from './modules/views/Home';
import Editor from './modules/views/Editor';
import TransitionScreen from './modules/views/Transition';

class App extends Component {
  state = {
    viewHome: true,
    viewEditor: false,
    viewTransition: false,
    page: '',
  }
  
  viewHandler = (view, res) => {
    if(view === 'home'){
      this.setState({  viewHome: false, viewEditor: false, viewTransition: false, page: '' });
      setTimeout(() => {
        this.setState({ viewHome: true });
      }, 350)
    }
    else if(view === 'transition' && res){
      this.setState({  viewHome: false, viewEditor: false, viewTransition: false });
      if(res !== -1) this.setState({ page: res.data, transitionDirection: 'editor' });
      else this.setState({ transitionDirection: 'home' });
      setTimeout(() => {
        this.setState({ viewTransition: true });
      }, 350)
    }
    else if(view === 'editor'){
      this.setState({  viewHome: false, viewEditor: false, viewTransition: false});
      setTimeout(() => {
        this.setState({ viewEditor: true });
      }, 350)
    }
  }

  render(){
    const { viewHome, viewTransition, viewEditor, page, transitionDirection } = this.state;
    return (
      <div className="App">
        <CSSTransition in={viewHome} timeout={300} classNames="alert" unmountOnExit>
          <Home viewHandler={this.viewHandler} />
        </CSSTransition>

        <CSSTransition in={viewTransition} timeout={300} classNames="alert" unmountOnExit>
          <TransitionScreen 
            viewHandler={this.viewHandler}
            transitionDir={transitionDirection}
            transition={viewTransition}
            loadingText={transitionDirection==='editor'?'Our AI model is generating your web page':'Resetting the application'}
          />
        </CSSTransition>

        <CSSTransition in={viewEditor} timeout={300} classNames="alert" unmountOnExit>
          <Editor viewHandler={this.viewHandler} page={page} />
        </CSSTransition>
      </div>
    );
  }
}

export default App;
// export default withRouter(App);