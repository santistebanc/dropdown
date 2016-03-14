import React from 'react';
import Icon from './Icon.jsx';

class DropDownCaretIcon extends Icon {
  constructor(props) {
    super(props);
  }
  render() {
    const iconcss = "dd-caret fa fa-caret-right";
    return <i className={iconcss}/>;
  }
}

export default DropDownCaretIcon;
