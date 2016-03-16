import React from 'react';
import SearchFunction from './SearchFunction.js';
import Menu from './Menu.jsx';

class SearchBar extends React.Component {
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
    //this.blur();
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
    // res.customItem = function(item){
    //   let path_output = [];
    //     item.path.forEach((it,idx)=>{
    //       var slot = [icon(it.icon),it.title,icon("caret-right")];
    //       path_output.push(...slot);
    //     });
    //     let formated_title = formatText(item.title,item.mark_pos,value.length);
    //     let item_output = [icon(item.icon),formated_title];
    //   return <a><span className="menu-light">{path_output}</span>{item_output}</a>;
    // };
  }
  render(){
    //data has to appear here so that it is not passed with ...other
    var { data, placeholder, autoFocus, ...other } = this.props;

    let style_wrapper = {};
    style_wrapper.border = this.state.focused && "3px solid #73AD21";

    return(
      <div style={style_wrapper} onClick={this.handleClickInside.bind(this)}>
        <input type="text" value={this.state.value} placeholder={placeholder} autoFocus={autoFocus} onChange={this.handleChangeText.bind(this)} onFocus={this.handleFocusBar.bind(this)} onBlur={this.handleBlurBar.bind(this)}/>
        {this.state.menuVisible && this.state.focused && <Menu data={this.state.searchResults} onClose={this.hideMenu.bind(this)} {...other} />}
      </div>
    );
  }
}

export default SearchBar;
