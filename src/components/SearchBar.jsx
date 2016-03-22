import React from 'react';
import ReactDom from 'react-dom';
import SearchFunction from './SearchFunction.js';
import Menu from './Menu.jsx';
import Icon from './Icon.jsx';
import FloatRightIcon from './FloatRightIcon.jsx';

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
      }
    }
  }
  showMenu() {
    this.setState({menuVisible:true});
    //this.props.onOpen && this.props.onOpen(this);
  }
  hideMenu() {
    this.setState({menuVisible:false});
    this.props.onClose && this.props.onClose(this);
  }
  blur() {
    this.setState({focused:false});
    //this.hideMenu();
  }
  focus() {
    this.setState({focused:true});
    this.props.onOpen && this.props.onOpen(this);
  }
  handleCloseMenu() {
    console.log('here');
    this.blur();
    this.hideMenu();
  }
  handleChangeText(event){
    let newvalue = event.target.value;
    this.setState({value:newvalue});
    if(newvalue.length==0){
      console.log('hidemenu');
      this.blur();
      this.hideMenu();
    }else {
      this.searchInput(newvalue);
      if(this.search_output.length == 0){
        console.log('output = 0');
        this.showMenu();
        this.blur();
        this.props.onClose && this.props.onClose(this);
      }else{
        console.log('showmenu');
        this.focus();
        this.showMenu();
      }
    }
  }
  handleFocusBar(event){
    //this.focus();
    // let newvalue = event.target.value;
    // if(newvalue.length>0){
    //   this.searchInput(newvalue);
    //   this.showMenu();
    // }
  }
  handleBlurBar(event){
    let el = this.refs.input;
    let node = ReactDom.findDOMNode(el);
    node.focus();
  }
  handleClickInside(event){
    event.stopPropagation();
    this.showMenu();
    if(this.search_output.length>0){
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
        let item_output = <span className={itemdata.selected && "menu-light"}><Icon name={itemdata.icon}/>{formated_title}<FloatRightIcon name={itemdata.selected?"remove":""} /></span>;
      return <div><span className="menu-light">{path_output}</span>{item_output}</div>;
    };
  }
  render(){
    //data has to appear here so that it is not passed with ...other
    var { data, placeholder, autoFocus, itemCustomContent, onClose, ...other } = this.props;
    let searchdata = this.state.searchResults;
    let style_wrapper = {};
    //style_wrapper.border = this.state.focused && "3px solid #73AD21";
    let renderpos = (this.search_output && this.search_output.length>0)?'bottom':'left';
    return(
      <div style={style_wrapper} onClick={this.handleClickInside.bind(this)}>
        <input ref={"input"} type="text" value={this.state.value} placeholder={placeholder} autoFocus={autoFocus} onChange={this.handleChangeText.bind(this)} onFocus={this.handleFocusBar.bind(this)} onBlur={this.handleBlurBar.bind(this)}/>
        {this.state.menuVisible && <Menu el={this.refs.input} data={data} isSearchMenu dropdownPos={renderpos} itemdata={searchdata} onClose={this.handleCloseMenu.bind(this)} itemCustomContent={this.customItem} {...other} />}
      </div>
    );
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
