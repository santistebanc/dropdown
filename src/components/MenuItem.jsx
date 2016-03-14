import React from 'react';
import Icon from './Icon.jsx';
import DropDown from './DropDown.jsx';
import DropDownCaretIcon from './DropDownCaretIcon.jsx';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    var { data, onSelectItem, ...other } = this.props;

    if(data.items){
      return(
      <DropDown data={data} {...other} >
        <li><Icon name={data.icon}/>{data.title}<DropDownCaretIcon/></li>
      </DropDown>
      );
    }else{
      return(
        <li onClick={onSelectItem}><Icon name={data.icon}/>{data.title}</li>
      );
    }
  }
}

export default MenuItem;
