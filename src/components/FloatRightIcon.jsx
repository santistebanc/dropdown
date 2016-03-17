import React from 'react';
import Icon from './Icon.jsx';

class FloatRightIcon extends Icon {
  constructor(props) {
    super(props);
  }
  render() {
    const iconcss = "float-right fa fa-" + this.props.name;
    return <i className={iconcss}/>;
  }
}

export default FloatRightIcon;
