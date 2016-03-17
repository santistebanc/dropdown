import React from 'react';
import Menu from './Menu.jsx';
import MenuOfSelectedItem from './MenuOfSelectedItem.jsx';

class MenuOfSelected extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //onOpen and onClose should not be passed onward through ...other
    var { data, ...other } = this.props;
    let style_menu = {};
    let maxHeight = data.menuOfSelectedMaxHeight;
    if(maxHeight){
      style_menu.maxHeight = maxHeight;
    }
    if(data && data.selectedItems && data.selectedItems.length>0){
      return (<ul style={style_menu}>{data.selectedItems.map((item,index) => {
          return <MenuOfSelectedItem key={index} itemdata={item} {...other} />;
      })}</ul>);
    }else{
        return <p className={"empty-label"}>...</p>;
    }
  }
}

export default MenuOfSelected;
