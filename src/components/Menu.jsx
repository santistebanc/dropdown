import React from 'react';
import MenuItem from './MenuItem.jsx';
import MenuDropDownItem from './MenuDropDownItem.jsx'
import SearchBar from './SearchBar.jsx';

class Menu extends React.Component {
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
    //onOpen and onClose should not be passed onward through ...other
    var { data, searchbar, width, height, onOpen, onClose, ...other } = this.props;

    let style_wrapper = {width:width};
    let style_menu = {height:height};
    style_wrapper.border = this.state.focused && "3px solid #73AD21";

    //override data with the asynchronously obtained one if there is any
    data = this.state.data || data;

    let searchbar_is_active = this.state.selectedIndex==-2?undefined:false;

    return (<div style={style_wrapper} className={"menu-tag"} onClick={this.handleClickInside.bind(this)}>
              <h4>{data.title}</h4>
              {searchbar && <SearchBar focused={searchbar_is_active} data={data} onOpen={this.handleOpenSearchMenu.bind(this)} onClose={this.handleCloseSearchMenu.bind(this)} {...searchbar}/>}
              <ul style={style_menu}>
                {this.renderItems.call(this,data,other)}
              </ul>
            </div>);
  }
  renderItems(data, other){
      if(data && data.items){
        return data.items.map((item,index) => {
          if(item.items){
            let menu_is_visible = this.state.selectedIndex==index;
            return <MenuDropDownItem key={index} data={item} menuVisible={menu_is_visible} onClose={this.handleCloseSubMenu.bind(this,index)} onOpen={this.handleOpenSubMenu.bind(this,index)} {...other} />;
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
