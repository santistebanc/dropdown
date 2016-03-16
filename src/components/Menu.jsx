import React from 'react';
import MenuItem from './MenuItem.jsx';
import MenuDropDownItem from './MenuDropDownItem.jsx'
import SearchBar from './SearchBar.jsx';
import MenuOfSelected from './MenuOfSelected.jsx'

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {focused:true, selectedIndex:-1, selectedItems:props.selectedItems || []};
  }
  componentWillReceiveProps(nextProps) {
      this.setState({selectedItems:nextProps.selectedItems || this.state.selectedItems});
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
    if(this.props.selectable){
      if(item.selected){
        item.selected = false;
        let index = this.state.selectedItems.indexOf(item);
        let arr = this.state.selectedItems.slice(0);
        arr.splice(index,1);
        this.setState({selectedItems:arr});
      }else{
        item.selected = true;
        this.setState({selectedItems:[...this.state.selectedItems,item]});
      }
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
    var { width } = this.props;
    let style_wrapper = {width:width};
    style_wrapper.border = this.state.focused && "3px solid #73AD21";

    return (<div style={style_wrapper} className={"menu-tag"} onClick={this.handleClickInside.bind(this)}>
              {this.renderTitle()}
              {this.renderMenuOfSelected()}
              {this.renderSearchbar()}
              {this.renderItems()}
            </div>);
  }
  renderTitle(){
    var { data } = this.props;
      return <h4>{data.title}</h4>;
  }
  renderMenuOfSelected(){
    var { selectable } = this.props;
    let selectedItemsObject = {};
    selectedItemsObject.items = this.state.selectedItems;
    console.log(selectedItemsObject);
      return selectable && <MenuOfSelected data={selectedItemsObject}/>;
  }
  renderSearchbar(){
    var { data, searchbar } = this.props;
    let searchbar_is_active = this.state.selectedIndex==-2?undefined:false;
    return searchbar && <SearchBar focused={searchbar_is_active} data={data} onOpen={this.handleOpenSearchMenu.bind(this)} onClose={this.handleCloseSearchMenu.bind(this)} {...searchbar}/>;
  }
  renderItems(){
    //onOpen and onClose should not be passed onward through ...other
    var { data, searchbar, selectable, width, height, onOpen, onClose, ...other } = this.props;
    let style_menu = {height:height};
      if(data && data.items){
        return(<ul style={style_menu}>{data.items.map((item,index) => {
          if(item.items){
            let menu_is_visible = this.state.selectedIndex==index;
            return <MenuDropDownItem key={index} data={item} selectable={selectable} selectedItems={this.state.selectedItems} menuVisible={menu_is_visible} onClose={this.handleCloseSubMenu.bind(this,index)} onOpen={this.handleOpenSubMenu.bind(this,index)} {...other} />;
          }else{
            return <MenuItem key={index} data={item} onChooseItem={this.handleChooseItem.bind(this,item)} {...other} />;
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

export default Menu;
