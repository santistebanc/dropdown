import React from 'react';
import Icon from './Icon.jsx';
import FloatRightIcon from './FloatRightIcon.jsx';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
  }
  handleOnClick(){
    this.props.onChooseItem && this.props.onChooseItem(this.props.itemdata);
  }
  render() {
    var { itemdata, itemCustomContent } = this.props;

    var content = itemCustomContent && itemCustomContent(itemdata) || <span className={itemdata.selected && "menu-light"}><Icon name={itemdata.icon}/>{itemdata.title}<FloatRightIcon name={itemdata.selected?"remove":""} /></span>;

    return <li onClick={this.handleOnClick.bind(this)}>{content}</li>;

  }
}

export default MenuItem;
