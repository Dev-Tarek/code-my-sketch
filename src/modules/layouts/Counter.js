import React from 'react';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class Counter extends React.Component {
   
    handleChange = (inc) => { 
        const { styleDeclarations } = this.props;
        let key = this.props.parent + '-' + this.props.label;
        let index = styleDeclarations? styleDeclarations.findIndex(dec => dec['property'] === key) : -1;
        let value = index > -1? styleDeclarations[index].value : 10;
        // console.log('value: ' + value)
        value = inc? parseInt(value) + 1: parseInt(value) - 1;
        this.props.editHandler(key, value +'px');
      };
      
    render() {
      const { styleDeclarations } = this.props;
      let key = this.props.parent + '-' + this.props.label;
      let index = styleDeclarations? styleDeclarations.findIndex(dec => dec['property'] === key) : -1;
      let value = index > -1? styleDeclarations[index].value : 10;
      let label = capitalizeFirstLetter(this.props.label)
      return (
        <div className="editor-counter">
          <button className='inc btn btn-light' onClick={this.handleChange.bind(this, false)}> - </button>
          <p> {label}: {parseInt(value)} </p>
          <button className='dec btn btn-light' onClick={this.handleChange.bind(this, true)}> + </button>
        </div>
      );
    }
  };
 export default Counter;