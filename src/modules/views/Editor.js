import React, { Component } from 'react';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';
import { stringify } from 'css';

import Drawer from '../components/Drawer';
import { options } from '../../assets/style-options';
import { process, pad, replaceBetween } from '../../assets/functions';

const createNewStyleRule = (style, id) => {
  style.stylesheet.rules.push({
    type: 'rule',
    parent: style,
    selectors: [id],
    declarations: []
  });
  return style.stylesheet.rules.length - 1;
}

const addNewStyleDeclaration = (rule, key, value) => {
  let index = rule.declarations.findIndex(dec => dec['property'] === key);
  if(index > -1){
    rule.declarations[index].value = value;
    return;
  }
  rule.declarations.push({
    type: 'declaration',
    property: key,
    value: value,
  });
}

export default class extends Component {

  state = {
    page: process(this.props.page),
    elements: [],
    modelDivID: 'modelOutputDiv',
    style: {
      type: 'stylesheet',
      stylesheet: {
        rules: [
          {type: 'rule', selectors: ['*'], declarations: [
            {type: 'declaration', property: 'cursor', value: 'crosshair'}
          ]},
          {type: 'rule', selectors: ['body'], declarations: [
            {type: 'declaration', property: 'padding-top', value: '56px'}
          ]},
          {type: 'rule', selectors: ['.carousel-inner'], declarations: [
            {type: 'declaration', property: 'cursor', value: 'crosshair'},
            {type: "declaration", property: "max-height", value: "300px !important"}
          ]},
          /*
          {type: 'rule', selectors: ['.carousel::after'], declarations: [
            {type: "declaration", property: "content", value: "'carousel edit'"},
            {type: "declaration", property: "color", value: "white"},
            {type: "declaration", property: "background", value: "gray"},
            {type: "declaration", property: "border-bottom-left-radius", value: "4px"},
            {type: "declaration", property: "border-bottom-right-radius", value: "4px"},
            {type: "declaration", property: "padding", value: "1px"},
            {type: "declaration", property: "margin-top", value: "-6px"},
            {type: "declaration", property: "float", value: "right"},
          ]},
          */
        ],
        parsingErrors: [],
        source: undefined,
      }
    },
    selectedId: null,
    selectedTag: null,
    openPanel: null,
  }
  
  componentDidMount = () => {
    const { elements } = this.state;
    const count = (this.state.page.match(/id="_element_id_/g) || []).length;
    let i = 0, f = 0, id = '';
    while(f < count){
      id = "_element_id_" + pad(i, 4);
      const element = document.getElementById(id);
      if(element){
        element.classList.add("editable");
        const ref = this.handleClick.bind(this, id);
        element.addEventListener('click', ref, false);
        elements.push({id: id, function: ref})
        f++;
      }
      i++;
      if(i > 150) break;
    }

    id = '_element_brand';
    const logoElement = document.getElementById(id);
    if(logoElement){
      logoElement.classList.add("editable");
      const ref = this.handleClick.bind(this, id);
      logoElement.addEventListener('click', ref, false);
      elements.push({id: id, function: ref})
    }

    this.setState({ elements: elements })
    document.getElementsByTagName('body')[0].style.background = '';
  }

  componentWillUnmount = () => {
    for(let element of this.state.elements)
      document.getElementById(element.id).removeEventListener('click', element.ref, false);
  }

  transform = (node, index) => {
    
    if (node.type === 'tag' && node.attribs.id === this.state.selectedId){
      node.attribs.style = 'border-bottom: 2px solid red; ';
      return convertNodeToElement(node, index, this.transform);
    }
    if (node.name === 'style'){
        node.children[0].data = stringify(this.state.style);
        return convertNodeToElement(node, index, this.transform);
    }
  }

  getStyleRule = () => {
    const { style } = this.state;
    let selectedRule = null;
    for (let rule of style.stylesheet.rules){
      if (rule.selectors.findIndex(selector => selector.indexOf(this.state.selectedId) > -1) > -1){
        selectedRule = rule;
      }
    }
    return selectedRule? selectedRule.declarations : null;
  }

  editHandler = (key, value) => {
    // Salma
    if (document.getElementById(this.state.selectedId).className.indexOf("carousel")>-1){
      this.carouselHandler(key,value)
    }
    else {
      if(key.indexOf("contents-text") > -1){
        document.getElementById(this.state.selectedId).textContent = value;
      }
      else if (key.indexOf("image-source") > -1){
        document.getElementById(this.state.selectedId).src = value;
      }
      else
        this.updateStyleRule(key, value);
      }
  }

  // Salma
  carouselHandler =(key,value) =>{
    if (key ==="image-selected image"){
      let allNodes= document.getElementById(this.state.selectedId).getElementsByClassName("carousel-inner")[0].childNodes;
      for(let i=0; i< allNodes.length; i++){
          if (allNodes[i].className.indexOf('active') > -1){
            if (allNodes[i].firstChild.tagName=== "IMG"){
              allNodes[i].firstChild.src=value;
          }
        }
      }
    }
    else
      this.updateStyleRule(key,value);
  }

  updateElementContents = (key, value) => {
    if(key.indexOf('text') > -1){
      if(value === '')
        value = ' ';
      let element = document.getElementById(this.state.selectedId);
      element.textContent = value;
      this.setState({
        page: process(document.getElementById(this.state.modelDivID).innerHTML)
      })
    }
  }

  updateStyleRule = (key, value) => {
    
    const { style } = this.state;
    let selectedRule = null;
    if(key === 'font-color')
      key = 'color';
    value += ' !important'
    for (let rule of style.stylesheet.rules){
      if (rule.selectors.findIndex(selector => selector.indexOf(this.state.selectedId) > -1) > -1){
        addNewStyleDeclaration(rule, key, value);
        selectedRule = rule;
      }
    }

    if(this.state.selectedId && !selectedRule){
      let index = createNewStyleRule(style, '#' + this.state.selectedId)
      selectedRule = style.stylesheet.rules[index];
      addNewStyleDeclaration(selectedRule, key, value);
    }
    
    this.setState({
        style: style,
    })
  }

  handleClick = (id, event) => {
    event.preventDefault();

    if(event.target !== document.getElementById(id))
      return false;
    
    this.state.selectedId === id?
        this.setState({
            selectedId: null,
            selectedTag: null,
            openPanel: null,
        })
    :
        this.setState({
            selectedId: id,
            selectedTag: event.target.tagName,
            openPanel: null,
        });
  }

  expansionHandler = (key) => {
    this.state.openPanel === key?
    this.setState({openPanel: null}) : this.setState({openPanel: key});
  }
  
  // Salma
  handleOptions = (element) =>{
    if(element !== null){       
      if(element.className.indexOf("carousel")>-1){
        return options['Carousel'];
        }  
      else
      return options[this.state.selectedTag];
      }
  }

  getRenderedPage = () => {
    this.setState({
      selectedId: null, selectedTag: null,
    })
    let page = process(document.getElementById(this.state.modelDivID).innerHTML);
    return replaceBetween(
      page,
      page.indexOf('<style>'),
      page.indexOf('</style>') + 8,
      ''
    )
  }

  render(){
    const element = this.state.selectedId === null ? null : document.getElementById(this.state.selectedId);
    return <React.Fragment>
        <div id={this.state.modelDivID}>{ReactHtmlParser(this.state.page, {transform: this.transform})}</div>
        <Drawer
          viewHandler = {this.props.viewHandler}
          tagAttributes = {this.handleOptions(element)}
          id = {this.state.selectedId}
          editHandler = {this.editHandler}
          expansionHandler = {this.expansionHandler}
          expandedPanel = {this.state.openPanel}
          styleDeclarations = {this.getStyleRule()}
          page = {this.getRenderedPage}
          style = {this.state.style}
        />
    </React.Fragment>
  }
}
