import React from 'react';
import Menu from './Menu.jsx';

require('./DropDown.less');

let ClickOutHandler = require('react-onclickout');

class DropDown extends React.Component {
  constructor(props) {
      super(props);
      this.state = {menuVisible: false};
    }
    showMenu() {
      this.setState({menuVisible:true});
    }
    hideMenu() {
      this.setState({menuVisible:false});
    }
    handleClickOutside(evt) {
      this.hideMenu();
    }
    render() {

      var { children, async, onClose, ...other } = this.props;

      let menu = <Menu onClose={this.hideMenu.bind(this)} {...other} />;

      //transforms whichever child elements to become clickable
      var childrenWithProps = React.Children.map(children, (child) => {
          return React.cloneElement(child, {onClick: this.showMenu.bind(this)});
      });

      return <ClickOutHandler onClickOut={this.handleClickOutside.bind(this)}>{childrenWithProps}{this.state.menuVisible && menu}</ClickOutHandler>;
    }
}

export default DropDown;
