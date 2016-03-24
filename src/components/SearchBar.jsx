import React from 'react';
import ReactDom from 'react-dom';
import SearchFunction from './SearchFunction.js';
import Menu from './Menu.jsx';
import Icon from './Icon.jsx';
import FloatRightIcon from './FloatRightIcon.jsx';
var Mousetrap = require("mousetrap/mousetrap.js");

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {menuVisible: false, searchResults:[]};
    //this.state.focused = props.focused===undefined?false:props.focused;
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.focused!==undefined){
      this.setState({focused:nextProps.focused});
      if(!nextProps.focused){
        this.setState({focused:false});
        this.setState({menuVisible:false});
        this.setState({value:""});
      }
    }
  }
  showMenu() {
    this.setState({menuVisible:true});
  }
  hideMenu() {
    this.setState({menuVisible:false});
    this.props.onClose && this.props.onClose(this);
  }
  blur() {
    this.setState({focused:false});
    this.setState({value:""});
    //this.hideMenu();
  }
  focus() {
    Mousetrap.unbind(['up','down','left','right','enter']);
    Mousetrap.bind('esc', (e)=>{ this.handleEscKey(e); });
    this.setState({focused:true});
    this.props.onOpen && this.props.onOpen(this);
  }
  handleSubMenuKeyInput(e){
    let el = this.refs.input;
    let node = ReactDom.findDOMNode(el);
    let pos = node.selectionEnd;
    if(e.code == 'ArrowDown' || e.code == 'ArrowUp'){
      this.placeCursorAt = pos;
    }else{
      this.placeCursorAt = undefined;
    }
  }
  handleSelectText(e){
    e.preventDefault();
    e.stopPropagation();
    let el = this.refs.input;
    let node = ReactDom.findDOMNode(el);
    if(this.placeCursorAt!==undefined){
      createSelection(node, this.placeCursorAt, this.placeCursorAt);
      this.placeCursorAt = undefined;
    }
  }
  handleEscKey(){
    this.blur();
    this.hideMenu();
  }
  handleCloseMenu() {
    this.blur();
    this.hideMenu();
  }
  handleChangeText(event){
    this.changedInput = true;
    let newvalue = event.target.value;
    this.setState({value:newvalue});
    if(newvalue.length==0){
      this.blur();
      this.hideMenu();
    }else {
      this.searchInput(newvalue);
      if(this.search_output && this.search_output.length == 0){
        this.showMenu();
        this.focus();
      }else{
        this.showMenu();
        this.focus();
      }
    }
  }
  handleClickInside(event){
    let newvalue = event.target.value;
    event.stopPropagation();
    this.focus();
    this.searchInput(newvalue);
    this.showMenu();
    if(this.search_output && this.search_output.length>0){
      this.props.onOpen && this.props.onOpen(this);
    }
    //this.focus();
  }
  searchInput(value){
    this.search_output = SearchFunction(this.props.data.items,value);
    let resultsObject = {};
    resultsObject.items = this.search_output;
    this.setState({searchResults:resultsObject});
    this.customItem = function(itemdata){
      let path_output = [];
        itemdata.path.forEach((it,idx)=>{
          var slot = <span key={idx}><Icon name={it.icon}/>{it.title}<span style={{margin:'0 2px'}} ><Icon name="caret-right"/></span></span>;
          path_output.push(slot);
        });
        let formated_title = formatText(itemdata.title,itemdata.mark_pos,value.length);
        let item_output = <span className={itemdata.selected && "menu-light"}><FloatRightIcon name={itemdata.selected?"remove":""} /><Icon name={itemdata.icon}/>{formated_title}</span>;
      return <div><span className="menu-light">{path_output}</span>{item_output}</div>;
    };
  }
  componentWillUpdate(){
    let el = this.refs.input;
    let node = ReactDom.findDOMNode(el);
    node.focus();
  }
  render(){
    //data has to appear here so that it is not passed with ...other
    var { data, placeholder, autoFocus, itemCustomContent, onClose, ...other } = this.props;
    let searchdata = this.state.searchResults;
    let style_wrapper = {};
    //style_wrapper.border = this.state.focused && "3px solid #73AD21";
    //let renderpos = (this.search_output && this.search_output.length>0)?'bottom':'left';
    return(
      <div style={style_wrapper} onClick={this.handleClickInside.bind(this)}>
        <input ref={"input"} type="text" value={this.state.value} placeholder={placeholder} autoFocus onSelect={this.handleSelectText.bind(this)} onChange={this.handleChangeText.bind(this)}/>
        {this.state.menuVisible && <Menu el={this.refs.input} data={data} isSearchMenu onKeyInput={this.handleSubMenuKeyInput.bind(this)} updateFocus={this.changedInput} dropdownPos={"bottom"} itemdata={searchdata} onClose={this.handleCloseMenu.bind(this)} itemCustomContent={this.customItem} {...other} />}
      </div>
    );
  }
  componentDidUpdate(){
    this.changedInput = false;
    this.placeCursorAt = undefined;
  }
}

function formatText(string,positions,size){
  let result = [];
  let start = 0;
  let pos = 0;

  for(let i=0;i<positions.length;i++){
    let first = string.slice(start,positions[i]);
    let second = <b>{string.substr(positions[i],size)}</b>;
    let third = string.slice(positions[i]+size);
    result.push([first,second]);
    start = positions[i]+size;
    if(i == positions.length-1){
      result.push(third);
    }
  }
  return result;
}

function createSelection(field, start, end) {
    if( field.createTextRange ) {
      var selRange = field.createTextRange();
      selRange.collapse(true);
      selRange.moveStart('character', start);
      selRange.moveEnd('character', end);
      selRange.select();
      field.focus();
    } else if( field.setSelectionRange ) {
      field.focus();
      field.setSelectionRange(start, end);
    } else if( typeof field.selectionStart != 'undefined' ) {
      field.selectionStart = start;
      field.selectionEnd = end;
      field.focus();
    }
  }
