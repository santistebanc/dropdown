import React from 'react';
import Menu from './Menu.jsx';
import MenuAsync from './MenuAsync.jsx';
import SelectableMenu from './SelectableMenu.jsx';
import SelectableMenuAsync from './SelectableMenu.jsx';
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
    renderMenu(selectable, other){
      if(this.props.async){
        return selectable?<SelectableMenuAsync {...other} />:<MenuAsync onClose={this.hide.bind(this)} {...other} />;
      }else{
        return selectable?<SelectableMenu {...other} />:<Menu onClose={this.hide.bind(this)} {...other} />;
      }
    }
    render() {

      var { children, async, selectable, manualVisible, ...other } = this.props;

      let menu = this.renderMenu(selectable, other);

      if(manualVisible !== undefined){
        var childrenWithProps = children;
      }else{ //transforms whichever child elements to become clickable
        var childrenWithProps = React.Children.map(children, (child) => {
          return React.cloneElement(child, {onClick: this.show.bind(this)});
        });
      }

      return <div>{childrenWithProps}{this.state.visible && menu}</div>;
    }
}

export default DropDown;
