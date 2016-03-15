import React from 'react';
import MenuItem from './MenuItem.jsx';
import MenuDropDownItem from './MenuDropDownItem.jsx'
import SearchBar from './SearchBar.jsx';
let ClickOutHandler = require('react-onclickout');

class Menu extends React.Component {
  constructor(props) {
    super(props);
    //immediately focus when instantiated and trigger unfocus to parent menu
    this.state = {focused:true, selectedIndex:-1};
    props.onFocus && props.onFocus(this);
  }
  handleFocusSubMenu(index){
    console.log(this.props.data.title,"has focused another:");
    this.setState({selectedIndex:index});
    this.unfocus();
  }
  // handleSelectOption(index){
  //   this.setState({selectedIndex:index})
  // }
  // isvisibleornot(index){
  //   return this.state.selectedIndex==index;
  // }
  unfocus() {
    this.setState({focused:false});
    this.props.onLoseFocus && this.props.onLoseFocus();
  }
  focus() {
    this.setState({focused:true});
  }
  clickInside(){
    // if(this.clickedInsideSubMenu == true){
    //   console.log("prevented clicked inside ", this.props.data.title);
    //   this.clickedInsideSubMenu = false;
    // }else{
    // console.log("clicked inside ", this.props.data.title);
    // this.props.clickedInsideSubMenu && this.props.clickedInside();
    // //this.setState({selectedIndex:-1})
    // this.focus();
    // }
  }
  handleClickOutside(evt) {
    console.log("click out", this.props.data.title);
    this.unfocus();
  }
  // handleClickedInsideSubMenu(){
  //     this.clickedInsideSubMenu = true;
  //     this.props.clickedInside && this.props.clickedInside();
  // }
  render() {

    var { data, searchbar, width, height, onFocus, ...other } = this.props;

    let style_wrapper = {width:width};
    let style_menu = {height:height};
    style_wrapper.border = this.state.focused && "3px solid #73AD21";

    //override data with the asynchronously obtained one
    data = this.state.data || data;

    let menu = (<div style={style_wrapper} className={"menu-tag"} onClick={this.clickInside.bind(this)}>
                  <h4>{data.title}</h4>
                  {searchbar && <SearchBar/>}
                  <ul style={style_menu}>
                    {this.renderItems.call(this,data,other)}
                  </ul>
                </div>);

    if(this.state.focused){
      return <ClickOutHandler onClickOut={this.handleClickOutside.bind(this)}>{menu}</ClickOutHandler>;
    }else{
      return menu;
    }
  }
  renderItems(data, other){
      if(data && data.items){
        return data.items.map((item,index) => {
          if(item.items){
            let menu_is_visible = this.state.selectedIndex==index;
            return <MenuDropDownItem key={index} data={item} visible={menu_is_visible} onFocus={this.handleFocusSubMenu.bind(this,index)} {...other} />;
          }else{
            return <MenuItem key={index} data={item} {...other} />;
          }
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
