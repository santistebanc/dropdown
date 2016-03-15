import React from 'react';
import Icon from './Icon.jsx';
import DropDown from './DropDown.jsx';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    var { data, onSelectItem, ...other } = this.props;

    return <li onClick={onSelectItem}><Icon name={data.icon}/>{data.title}</li>;

  }
}

export default MenuItem;
