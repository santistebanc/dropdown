import React from 'react';
import Menu from './Menu.jsx';
import MenuItem from './MenuItem.jsx';

class MenuOfSelected extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //onOpen and onClose should not be passed onward through ...other
    var { data, ...other } = this.props;

    if(data && data.items && data.items.length>0){
      return (<ul>{data.items.map((item,index) => {
          return <MenuItem key={index} data={item} {...other} />;
      })}</ul>);
    }else{
        return <p className={"empty-label"}>...</p>;
    }
  }
}

export default MenuOfSelected;
