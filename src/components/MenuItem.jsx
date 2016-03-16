import React from 'react';
import Icon from './Icon.jsx';
import DropDown from './DropDown.jsx';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
  }
  handleOnClick(event){
    event.stopPropagation();
    this.props.onSelectItem && this.props.onSelectItem();
  }
  render() {

    var { data, onSelectItem, ...other } = this.props;

    return <li onClick={this.handleOnClick.bind(this)}><Icon name={data.icon}/>{data.title}</li>;

  }
}

export default MenuItem;
