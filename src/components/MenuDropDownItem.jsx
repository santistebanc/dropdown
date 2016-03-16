import React from 'react';
import Icon from './Icon.jsx';
import DropDownCaretIcon from './DropDownCaretIcon.jsx';
import Menu from './Menu.jsx';
import SelectableMenu from './SelectableMenu.jsx';
//tried to make it extend DropDown but there is an issue with circular dependencies and Babel

class MenuDropDownItem extends React.Component {
  constructor(props) {
      super(props);
      this.state = {};
      this.state.menuVisible = props.menuVisible===undefined?false:props.menuVisible;
  }
  handleOnClick(event){
    event.stopPropagation();
    if(!this.state.menuVisible){
      this.showMenu();
    }else{
      this.hideMenu();
    }
  }
  showMenu() {
      this.props.onOpen && this.props.onOpen(this);
      this.setState({menuVisible:true});
  }
  hideMenu() {
    this.setState({menuVisible:false});
    this.props.onClose();
  }
  handleCloseMenu(){
    this.hideMenu();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({menuVisible:nextProps.menuVisible===undefined?false:nextProps.menuVisible});
  }
  render() {
    var {data, selectable, menuVisible, ...other } = this.props;

    let menu = this.renderMenu(data, selectable, other);
    return <li onClick={this.handleOnClick.bind(this)}><Icon name={data.icon}/>{data.title}<DropDownCaretIcon />{this.state.menuVisible && menu}</li>;

  }
  renderMenu(data, selectable, other){
      return selectable?<SelectableMenu data={data} {...other} />:<Menu data={data} onClose={this.handleCloseMenu.bind(this)} {...other} />;
  }
}

export default MenuDropDownItem;
