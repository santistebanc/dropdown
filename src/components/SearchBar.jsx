import React from 'react';
import SearchFunction from './SearchFunction.js';
import Menu from './Menu.jsx';
import Icon from './Icon.jsx';
import FloatRightIcon from './FloatRightIcon.jsx';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {menuVisible: false, searchResults:[]};
    this.state.focused = props.focused===undefined?false:props.focused;
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.focused!==undefined){
      this.setState({focused:nextProps.focused});
    }
  }
  showMenu() {
    this.setState({menuVisible:true});
    this.props.onOpen && this.props.onOpen(this);
  }
  hideMenu() {
    this.setState({menuVisible:false});
    this.props.onClose && this.props.onClose(this);
  }
  blur() {
    this.setState({focused:false});
    this.hideMenu();
  }
  focus() {
    this.setState({focused:true});
    this.props.onOpen && this.props.onOpen(this);
  }
  handleChangeText(event){
    let newvalue = event.target.value;
    this.setState({value:newvalue});
    if(newvalue.length>0){
      this.searchInput(newvalue);
      this.showMenu();
    }else {
      this.hideMenu();
    }
  }
  handleFocusBar(event){
    this.focus();
    let newvalue = event.target.value;
    if(newvalue.length>0){
      this.searchInput(newvalue);
      this.showMenu();
    }
  }
  handleBlurBar(event){
    //nothing to do yet
  }
  handleClickInside(event){
    event.stopPropagation();
    this.focus();
  }
  searchInput(value){
    let search_output = SearchFunction(this.props.data.items,value);
    let resultsObject = {};
    resultsObject.items = search_output;
    this.setState({searchResults:resultsObject});
    this.customItem = function(itemdata){
      let path_output = [];
        itemdata.path.forEach((it,idx)=>{
          var slot = <span key={idx}><Icon name={it.icon}/>{it.title}<Icon name="caret-right"/></span>;
          path_output.push(slot);
        });
        let formated_title = formatText(itemdata.title,itemdata.mark_pos,value.length);
        let item_output = <span className={itemdata.selected && "menu-light"}><Icon name={itemdata.icon}/>{formated_title}<FloatRightIcon name={itemdata.selected?"remove":""} /></span>;
      return <div><span className="menu-light">{path_output}</span>{item_output}</div>;
    };
  }
  findDimensions(input){
      if (input != null) {
        this.el = input;
      }
  }
  render(){
    //data has to appear here so that it is not passed with ...other
    var { data, placeholder, autoFocus, itemCustomContent, ...other } = this.props;
    let searchdata = this.state.searchResults;
    let style_wrapper = {};
    //style_wrapper.border = this.state.focused && "3px solid #73AD21";

    return(
      <div style={style_wrapper} onClick={this.handleClickInside.bind(this)}>
        <input ref={this.findDimensions.bind(this)} type="text" value={this.state.value} placeholder={placeholder} autoFocus={autoFocus} onChange={this.handleChangeText.bind(this)} onFocus={this.handleFocusBar.bind(this)} onBlur={this.handleBlurBar.bind(this)}/>
        {this.state.menuVisible && this.state.focused && <Menu el={this.el} data={data} dropdownPos={'bottom'} itemdata={searchdata} onClose={this.hideMenu.bind(this)} itemCustomContent={this.customItem} {...other} />}
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
