import React from 'react';
import Menu from './Menu.jsx';
var $ = require("jquery");

class MenuAsync extends Menu {
  constructor(props) {
    super(props);
    this.state.data = [];
    this.getData();
  }
  getData() {
    this.serverRequest = $.get(this.props.src, ((result) => {this.setState({data:result})}).bind(this) );
  }
  componentWillUnmount() {
    this.serverRequest && this.serverRequest.abort();
  }
}

export default MenuAsync;
