import React from 'react';
import MenuItem from './MenuItem.jsx';
import SearchBar from './SearchBar.jsx';

let ClickOutHandler = require('react-onclickout');

class Menu extends React.Component {
  constructor(props) {
    super(props);
    //immediately focus when instantiated and trigger unfocus to parent menu
    this.state = {focused:true};
    this.props.onFocus && this.props.onFocus(this);
    this.handleClickOutside = this.handleClickOutside.bind(this); //needed for mixin
  }
  handleClickOutside(evt) {
    console.log("click outside of: ", this.props.data.title);
    if(this.state.focused){
      //this.props.onClose();
    }
  }
  handleFocusAnother(menu){
    console.log(this.props.data.title,"has focused another:", menu.props.data.title);
    this.unfocus();
  }
  unfocus() {
    this.setState({focused:false});
  }
  focus() {
    this.setState({focused:true});
    this.props.onFocus && this.props.onFocus(this);
  }
  render() {
    var { data, searchbar, width, height, onClose, onSelectOption, ...other } = this.props;

    let style_wrapper = {width:width};
    let style_menu = {height:height};
    style_wrapper.border = this.state.focused && "3px solid #73AD21";

    //override data with the asynchronously obtained one
    data = this.state.data || data;
    return(
      <ClickOutHandler onClickOut={this.handleClickOutside}>
        <div style={style_wrapper} className={"menu-tag"}>
          <h4>{data.title}</h4>
          {searchbar && <SearchBar/>}
          <ul style={style_menu}>
            {this.renderItems(data, other)}
          </ul>
        </div>
      </ClickOutHandler>
    );
  }
  renderItems(data, other){
      if(data && data.items){
        return data.items.map((item,index) => {
          return <MenuItem key={index} data={item} onFocus={this.handleFocusAnother.bind(this)} {...other} />
        });
      }else{
          return <p className={"empty-label"}>{this.props.emptyLabel}</p>;
      }
  }
}

Menu.defaultProps = {
  emptyLabel:"no data..."
};

export default Menu;
