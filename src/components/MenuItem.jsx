import React from 'react';
import Icon from './Icon.jsx';
import DropDown from './DropDown.jsx';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    var { data, onChooseItem, ...other } = this.props;
    return <li onClick={onChooseItem}><span className={data.selected && "menu-light"}><Icon name={data.icon}/>{data.title}</span></li>;

  }
}

export default MenuItem;
