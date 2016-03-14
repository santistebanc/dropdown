import React from 'react';
import Icon from './Icon.jsx';
import DropDown from './DropDown.jsx';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    var { data, onSelectItem, ...other } = this.props;

    if(data.items){
      return(
      <DropDown data={data} onSelectItem={onSelectItem} {...other} >
        <div><Icon name={data.icon}/>{data.title}<Icon name={"caret-right"}/></div>
      </DropDown>
      );
    }else{
      return(
        <div onClick={onSelectItem}><Icon name={data.icon}/>{data.title}</div>
      );
    }
  }
}

export default MenuItem;
