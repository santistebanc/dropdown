import React from 'react';
import Icon from './Icon.jsx';
import FloatRightIcon from './FloatRightIcon.jsx';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    var el = this.refs.theitem;
  }
  handleOnClick(){
    this.props.onChooseItem && this.props.onChooseItem(this.props.itemdata);
  }
  componentWillUnmount(){
    var el = this.refs.theitem;
  }
  render() {
    var { itemdata, itemCustomContent, highlighted } = this.props;
    var content = itemCustomContent && itemCustomContent(itemdata) || <span className={itemdata.selected && "menu-light"}><Icon name={itemdata.icon}/>{itemdata.title}<FloatRightIcon name={itemdata.selected?"remove":""} /></span>;

    return <li onClick={this.handleOnClick.bind(this)} className={highlighted && "menu-highlighted"} title={itemdata.hint || itemdata.title}>{content}</li>;

  }
}

export default MenuItem;
