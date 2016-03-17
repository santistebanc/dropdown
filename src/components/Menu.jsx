import React from 'react';
import MenuItem from './MenuItem.jsx';
import MenuDropDownItem from './MenuDropDownItem.jsx'
import SearchBar from './SearchBar.jsx';
import MenuOfSelected from './MenuOfSelected.jsx'

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {focused:true, selectedIndex:-1};
  }
  handleOpenSubMenu(index){
    this.setState({selectedIndex:index});
    this.blur();
  }
  handleCloseSubMenu(index){
    this.setState({selectedIndex:-1});
    this.focus();
  }
  handleClickInside(event){
    event.stopPropagation();
    this.setState({selectedIndex:-1});
    this.focus();
  }
  handleOpenSearchMenu(){
    this.setState({selectedIndex:-2});
    this.blur();
  }
  handleCloseSearchMenu(){
    this.setState({selectedIndex:-2});
  }
  handleChooseItem(item){
    if(this.props.onChooseItem){
      this.props.onChooseItem(item); //do nothing and let parent handle it
    }else if(this.props.selectable){
      if(item.selected){
        item.selected = false;
        let index = this.props.data.selectedItems.indexOf(item);
        let arr = this.props.data.selectedItems.slice(0);
        arr.splice(index,1);
        this.props.data.selectedItems = arr;
      }else{
        item.selected = true;
        this.props.data.selectedItems = [...this.props.data.selectedItems,item];
      }
      this.forceUpdate();
    }
  }
  blur() {
    this.setState({focused:false});
  }
  focus() {
    this.setState({focused:true});
  }
  close(){
    this.blur();
    this.props.onClose && this.props.onClose();
  }
  render() {
    var { data, itemdata, menuMaxHeight, menuWidth } = this.props;
    let thedata = itemdata || data;
    let style_wrapper = {};
    if(thedata.width){
      style_wrapper.width = thedata.width;
    }
    if(menuWidth){
      style_wrapper.width = menuWidth;
    }
    style_wrapper.border = this.state.focused && "3px solid #73AD21";

    return (<div style={style_wrapper} className={"menu-tag"} onClick={this.handleClickInside.bind(this)}>
              {this.renderTitle()}
              {this.renderMenuOfSelected()}
              {this.renderSearchbar()}
              {this.renderItems()}
            </div>);
  }
  renderTitle(){
    var { data, itemdata } = this.props;
    let thedata = itemdata || data;
      return <h4>{thedata.title}</h4>;
  }
  renderMenuOfSelected(){
    var { data, selectable, menuMaxHeight } = this.props;
    let maxHeight = data.menuOfSelectedMaxHeight;
    return selectable && selectable.menuofselected && <MenuOfSelected data={data} onChooseItem={this.handleChooseItem.bind(this)}/>;
  }
  renderSearchbar(){
    var { data, selectable, searchbar, menuMaxHeight } = this.props;
    let searchbar_is_active = this.state.selectedIndex==-2?undefined:false;
    let submenu_selectable = {...selectable, menuofselected:false}; //prevent submenu from having a menuofselected
    let maxHeight = data.searchMenuMaxHeight;
    let width = data.searchMenuWidth;
    return searchbar && <SearchBar menuWidth={width} menuMaxHeight={maxHeight} focused={searchbar_is_active} data={data} selectable={submenu_selectable} onChooseItem={this.handleChooseItem.bind(this)} onOpen={this.handleOpenSearchMenu.bind(this)} onClose={this.handleCloseSearchMenu.bind(this)} {...searchbar}/>;
  }
  renderItems(){
    //onOpen and onClose should not be passed onward through ...other
    var { data, itemdata, searchbar, selectable, selectedItems, onOpen, onClose, menuMaxHeight, ...other } = this.props;
    let thedata = itemdata || data;
    let style_menu = {};
    if(menuMaxHeight){
      style_menu.maxHeight = menuMaxHeight;
    }else if(thedata.optionsMaxHeight){
      style_menu.maxHeight = thedata.optionsMaxHeight;
    }
      if(thedata && thedata.items){
        return(<ul style={style_menu}>{thedata.items.map((item,index) => {
          if(item.items){
            let menu_is_visible = this.state.selectedIndex==index;
            let submenu_selectable = {...selectable, menuofselected:false}; //prevent submenu from having a menuofselected
            return <MenuDropDownItem key={index} data={data} itemdata={item} selectable={submenu_selectable} onChooseItem={this.handleChooseItem.bind(this)} menuVisible={menu_is_visible} onClose={this.handleCloseSubMenu.bind(this,index)} onOpen={this.handleOpenSubMenu.bind(this,index)} {...other} />;
          }else{
            return <MenuItem key={index} itemdata={item} onChooseItem={this.handleChooseItem.bind(this)} {...other} />;
          }
        })}</ul>);
      }else{
          return <p className={"empty-label"}>{this.props.emptyLabel}</p>;
      }
  }
}

Menu.defaultProps = {
  emptyLabel:"no data..."
};
