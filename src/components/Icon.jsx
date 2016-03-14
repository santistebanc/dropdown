import React from 'react';

class Icon extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const iconcss = "fa fa-" + this.props.name;
    return <i className={iconcss}/>;
  }
}

export default Icon;
