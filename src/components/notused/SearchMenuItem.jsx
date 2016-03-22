import React from 'react';
import MenuItem from './MenuItem.jsx';
import Icon from './Icon.jsx';

class SearchMenuItem extends MenuItem {
  constructor(props) {
    super(props);
  }
  render() {

    var { itemdata } = this.props;
    return <li onClick={this.handleOnClick.bind(this)}><span className={itemdata.selected && "menu-light"}><Icon name={itemdata.icon}/>{itemdata.title}</span></li>;

  }
}

export default SearchMenuItem;
