import React from 'react';
import MenuItem from './MenuItem.jsx';
import Icon from './Icon.jsx';
import FloatRightIcon from './FloatRightIcon.jsx';

class MenuOfSelectedItem extends MenuItem {
  constructor(props) {
    super(props);
  }
  render() {

    var { itemdata } = this.props;
    return <li onClick={this.handleOnClick.bind(this)} title={itemdata.hint || itemdata.title}><Icon name={itemdata.icon}/>{itemdata.title}<FloatRightIcon name="remove" /></li>;

  }
}

export default MenuOfSelectedItem;
