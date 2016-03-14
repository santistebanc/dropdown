import React from 'react';
import Menu from './Menu.jsx';
import SelectableMenu from './SelectableMenu.jsx';
require('./DropDown.less');

class DropDown extends React.Component {
  constructor(props) {
      super(props);
      this.state = {visible: false};
    }
    show() {
      this.setState({visible:true});
    }
    hide() {
      this.setState({visible:false});
    }
    handleLoseFocus(){

    }
    render() {

      var { children, selectable, manualVisible, ...other } = this.props;

      let menu = selectable?<SelectableMenu {...other} />:<Menu onLoseFocus={this.handleLoseFocus} {...other} />;

      if(manualVisible !== undefined){
        var childrenWithProps = children;
      }else{
        var childrenWithProps = React.Children.map(children, (child) => {
          return React.cloneElement(child, {onClick: this.show.bind(this)});
        });
      }

      return <div>{childrenWithProps}{this.state.visible && menu}</div>;
    }
}

export default DropDown;
