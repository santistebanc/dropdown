import React from 'react';
import MenuItem from './MenuItem.jsx';
import SearchBar from './SearchBar.jsx';

var reactMixin = require('react-mixin');
var onClickOutsideMixin = require('react-onclickoutside')

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClickOutside(evt) {
    this.props.handleLoseFocus.call(this);
  }
  render() {

    var { data, searchbar, width, height, ...other } = this.props;

    let style_wrapper = {width:width};
    let style_menu = {height:height};

    return (

      <div style={style_wrapper} className={"menu-tag"}>
        <h4>{data.title}</h4>
        {searchbar && <SearchBar/>}
        <ul style={style_menu}>
          {data.items.map((item,index) => {
            return <li key={index}><MenuItem data={item} {...other} /></li>
          })}
        </ul>
      </div>
    );
  }
}

reactMixin(Menu.prototype, onClickOutsideMixin);

export default Menu;
