import React from 'react';
import Menu from './Menu.jsx';
import SearchMenuItem from './SearchMenuItem.jsx';

var SearchMenu = class SearchMenu extends Menu{
  constructor(props) {
    super(props);
    console.log("thedata.items");
  }
  render() {
    var { width } = this.props;
    let style_wrapper = {width:width};
    style_wrapper.border = this.state.focused && "3px solid #73AD21";

    return (<div style={style_wrapper} className={"menu-tag"} onClick={this.handleClickInside.bind(this)}>
              {this.renderItems()}
            </div>);
  }
  renderItems(){
    console.log("thedata.items",thedata.items);
    //onOpen and onClose should not be passed onward through ...other
    var { data, itemdata, searchbar, selectable, selectedItems, width, height, onOpen, onClose, ...other } = this.props;
    let style_menu = {height:height};
    let thedata = itemdata || data;
      if(thedata && thedata.items && thedata.items.length>0){
        return(<ul style={style_menu}>{thedata.items.map((item,index) => {
            return <SearchMenuItem key={index} itemdata={item} onChooseItem={this.handleChooseItem.bind(this)} />;
        })}</ul>);
      }else{
          return <p className={"empty-label"}>{this.props.emptyLabel}</p>;
      }
  }
}

SearchMenu.defaultProps = {
  emptyLabel:"no hits"
};

export default SearchMenu;
