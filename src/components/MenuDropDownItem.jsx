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
      console.log(props.data.title,"visibleornot: ",props.visible);
      this.state.visible = props.visible===undefined?false:props.visible;
  }
  show() {
    this.setState({visible:true});
  }
  hide() {
    this.setState({visible:false});
  }
  handleOnLoseFocus(){
    this.hide();
  }
  render() {
    var {data, selectable, visible, onLoseFocus, ...other } = this.props;

    let menu = this.renderMenu(data, selectable, other);
    return <li onClick={this.show.bind(this)}><Icon name={data.icon}/>{data.title}<DropDownCaretIcon />{this.state.visible && menu}</li>;

  }
  renderMenu(data, selectable, other){
      return selectable?<SelectableMenu data={data} {...other} />:<Menu data={data} onClose={this.hide.bind(this)} onLoseFocus={this.handleOnLoseFocus.bind(this)} {...other} />;
  }
}

export default MenuDropDownItem;
