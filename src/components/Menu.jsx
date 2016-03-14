import React from 'react';
import MenuItem from './MenuItem.jsx';
import SearchBar from './SearchBar.jsx';

var reactMixin = require('react-mixin');
var onClickOutsideMixin = require('react-onclickoutside')

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  handleClickOutside(evt) {
    this.props.onLoseFocus();
  }
  asyncData(){
    //nothing to do here
  }
  render() {
    var { data, searchbar, width, height, onLoseFocus, ...other } = this.props;

    let style_wrapper = {width:width};
    let style_menu = {height:height};
        console.log("here",this.state.data);
    data = this.state.data?this.state.data:data;

    return (

      <div style={style_wrapper} className={"menu-tag"}>
        <h4>{data.title}</h4>
        {searchbar && <SearchBar/>}
        <ul style={style_menu}>
          {data && data.items && data.items.map((item,index) => {
            return <MenuItem key={index} data={item} {...other} />
          })}
        </ul>
      </div>
    );
  }
}

reactMixin(Menu.prototype, onClickOutsideMixin);

export default Menu;
