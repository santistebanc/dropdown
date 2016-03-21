import React from 'react';
import Icon from './Icon.jsx';
import FloatRightIcon from './FloatRightIcon.jsx';
import Menu from './Menu.jsx';
import GetDimensionsOfElement from './GetDimensionsOfElement';
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
  findDimensions(input){
      if (input != null) {
        this.el = input;
      }
  }
  render() {
    var {data, el, pos, itemdata, menuVisible, ...other } = this.props;
    let menu = <Menu el={this.el} data={data} itemdata={itemdata} onClose={this.handleCloseMenu.bind(this)} {...other} />;
    return <li ref={this.findDimensions.bind(this)} onClick={this.handleOnClick.bind(this)}><div><Icon name={itemdata.icon}/>{itemdata.title}<FloatRightIcon name="caret-right" /></div>{this.state.menuVisible && menu}</li>;

  }
}

export default MenuDropDownItem;
