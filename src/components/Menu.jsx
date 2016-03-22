import React from 'react';
import ReactDom from 'react-dom';
import MenuItem from './MenuItem.jsx';
import MenuDropDownItem from './MenuDropDownItem.jsx';
import SearchBar from './SearchBar.jsx';
import MenuOfSelected from './MenuOfSelected.jsx';
import GetDimensionsOfElement from './GetDimensionsOfElement';
var ResizeSensor = require('css-element-queries/src/ResizeSensor');
require("keymaster/keymaster");
//key('a', function(){ alert('you pressed a!') });

var Menu = class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {focused:true, selectedIndex:-1};
    this.changedPos = false; //variable used to force update in submenus
  }
  componentDidMount(){
    let menu = ReactDom.findDOMNode(this.refs.menudiv);
    var {data, itemdata} = this.props;
    let thedata = itemdata || data
    var element = this.refs.menudiv;
    new ResizeSensor(element, ()=>{
    this.updatePosition();
    });
    this.updatePosition();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.updatepos){
      this.updatePosition();
    }
  }
  updatePosition(){
    var {el, data, itemdata, dropdownPos} = this.props;
    let thedata = itemdata || data

    let menu = ReactDom.findDOMNode(this.refs.menudiv);

    let dim = GetDimensionsOfElement(menu,true);
    let dim_el = GetDimensionsOfElement(el,true);
    let dim_parent = GetDimensionsOfElement(dim.rparent);
    let dim_window = GetDimensionsOfElement(window);

    //changes the position of the menu depending on if it goes off the screen
    let pos = dropdownPos || thedata.dropdownPosition || 'right';

    let v_limity_low = (dim_parent.y+dim_el.ry-dim.h)<=0;
    let v_limity_high = (dim_parent.y+dim_el.ry+dim_el.h+dim.h)>=dim_window.h;
    let h_limity_low = (dim_parent.y+dim_el.ry+dim_el.h-dim.h)<=0;
    let h_limity_high = (dim_parent.y+dim_el.ry+dim.h)>=dim_window.h;

    let v_limitx_low = (dim_parent.x+dim_el.rx+dim_el.w-dim.w)<=0;
    let v_limitx_high = (dim_parent.x+dim_el.rx+dim.w)>=dim_window.w;
    let h_limitx_low = (dim_parent.x+dim_el.rx-dim.w)<=0;
    let h_limitx_high = (dim_parent.x+dim_el.rx+dim_el.w+dim.w)>=dim_window.w;


      switch(pos){
        case 'bottom':
          var def = {x:dim_el.rx, y:dim_el.ry+dim_el.h};
          var maxbreak = {x:v_limitx_high, y:v_limity_high};
          var minbreak = {x:v_limitx_low, y:v_limity_low};
          var alter = {x:dim_el.rx+dim_el.w-dim.w, y:dim_el.ry-dim.h};
          break;
        case 'top':
          var def = {x:dim_el.rx, y:dim_el.ry-dim.h};
          var maxbreak = {x:v_limitx_high, y:v_limity_low};
          var minbreak = {x:v_limitx_low, y:v_limity_high};
          var alter = {x:dim_el.rx+dim_el.w-dim.w, y:dim_el.ry+dim_el.h};
          break;
        case 'right':
          var def = {x:dim_el.rx+dim_el.w, y:dim_el.ry};
          var maxbreak = {x:h_limitx_high, y:h_limity_high};
          var minbreak = {x:h_limitx_low, y:h_limity_low};
          var alter = {x:dim_el.rx-dim.w, y:dim_el.ry+dim_el.h-dim.h};
          break;
        case 'left':
          var def = {x:dim_el.rx-dim_el.w, y:dim_el.ry};
          var maxbreak = {x:h_limitx_low, y:h_limity_high};
          var minbreak = {x:h_limitx_high, y:h_limity_low};
          var alter = {x:dim_el.rx+dim_el.w, y:dim_el.ry+dim_el.h-dim.h};
          break;
        }

    if(!maxbreak.x){
      var xpos = def.x;
    }else if(!minbreak.x){
      var xpos = alter.x;
    }else {
      var xpos = def.x;
    }
    if(!maxbreak.y){
      var ypos = def.y;
    }else if(!minbreak.y){
      var ypos = alter.y;
    }else {
      var ypos = def.y;
    }
      this.setState({positionMenu:{x:xpos,y:ypos}});
    this.changedPos = true;
  }
  handleOpenSubMenu(index){
    this.setState({selectedIndex:index});
    this.blur();
  }
  handleCloseSubMenu(index){
    this.setState({selectedIndex:-1});
    this.focus();
  }
  handleClickInside(event){
    event.stopPropagation();
    this.setState({selectedIndex:-1});
    this.focus();
  }
  handleOpenSearchMenu(){
    this.setState({selectedIndex:-2});
    this.blur();
  }
  handleCloseSearchMenu(){
    this.setState({selectedIndex:-2});
  }
  handleChooseItem(item){
    if(this.props.onChooseItem){
      this.props.onChooseItem(item); //do nothing and let parent handle it
    }else if(this.props.selectable){
      if(item.selected){
        item.selected = false;
        let index = this.props.data.selectedItems.indexOf(item);
        let arr = this.props.data.selectedItems.slice(0);
        arr.splice(index,1);
        this.props.data.selectedItems = arr;
      }else{
        item.selected = true;
        this.props.data.selectedItems = [...this.props.data.selectedItems,item];
      }
      this.forceUpdate();
    }
  }
  blur() {
    this.setState({focused:false});
  }
  focus() {
    this.setState({focused:true});
  }
  close(){
    this.blur();
    this.props.onClose && this.props.onClose();
  }
  render() {
    var { data, pos, itemdata, menuMaxHeight, menuWidth } = this.props;
    let thedata = itemdata || data;
    let style_wrapper = {};
    if(menuWidth){
      style_wrapper.width = menuWidth;
    }else if(thedata.width){
      style_wrapper.width = thedata.width;
    }else if(this.minWidth){
      style_wrapper.width = this.minWidth;
    }
    if(this.state.positionMenu){
      style_wrapper.left = this.state.positionMenu.x;
      style_wrapper.top = this.state.positionMenu.y;
    }
    //style_wrapper.border = this.state.focused && "3px solid #73AD21";

    return (<div ref={"menudiv"} style={style_wrapper} className={"menu-tag"} onClick={this.handleClickInside.bind(this)}>
              {this.renderTitle()}
              {this.renderMenuOfSelected()}
              {this.renderSearchbar()}
              {this.renderItems()}
            </div>);
  }
  renderTitle(){
    var { data, itemdata } = this.props;
    let thedata = itemdata || data;
      return <h4>{thedata.title}</h4>;
  }
  renderMenuOfSelected(){
    var { data, selectable, menuMaxHeight } = this.props;
    let maxHeight = data.menuOfSelectedMaxHeight;
    return selectable && selectable.menuofselected && <MenuOfSelected data={data} onChooseItem={this.handleChooseItem.bind(this)}/>;
  }
  renderSearchbar(){
    var { data, selectable, searchbar, menuMaxHeight } = this.props;
    let searchbar_is_active = this.state.selectedIndex==-2?undefined:false;
    let submenu_selectable = {...selectable, menuofselected:false}; //prevent submenu from having a menuofselected
    let maxHeight = data.searchMenuMaxHeight;
    let width = data.searchMenuWidth;
    return searchbar && <SearchBar updatepos={this.changedPos} menuWidth={width} menuMaxHeight={maxHeight} focused={searchbar_is_active} data={data} selectable={submenu_selectable} onChooseItem={this.handleChooseItem.bind(this)} onOpen={this.handleOpenSearchMenu.bind(this)} onClose={this.handleCloseSearchMenu.bind(this)} {...searchbar}/>;
  }
  renderItems(){
    //onOpen and onClose should not be passed onward through ...other
    var { data, itemdata, searchbar, selectable, selectedItems, onOpen, onClose, menuMaxHeight, ...other } = this.props;
    let thedata = itemdata || data;
    let style_menu = {};

    if(menuMaxHeight){
      style_menu.maxHeight = menuMaxHeight;
    }else if(thedata.optionsMaxHeight){
      style_menu.maxHeight = thedata.optionsMaxHeight;
    }
      if(thedata && thedata.items && thedata.items.length>0){
        return(<ul style={style_menu}>{thedata.items.map((item,index) => {
          if(item.items){
            let menu_is_visible = this.state.selectedIndex==index;
            let submenu_selectable = {...selectable, menuofselected:false}; //prevent submenu from having a menuofselected
            return <MenuDropDownItem key={index} data={data} itemdata={item} updatepos={this.changedPos} selectable={submenu_selectable} onChooseItem={this.handleChooseItem.bind(this)} menuVisible={menu_is_visible} onClose={this.handleCloseSubMenu.bind(this,index)} onOpen={this.handleOpenSubMenu.bind(this,index)} {...other} />;
          }else{
            return <MenuItem key={index} itemdata={item} onChooseItem={this.handleChooseItem.bind(this)} {...other} />;
          }
        })}</ul>);
      }else{
          return <p className={"empty-label"}>{this.props.emptyLabel}</p>;
      }
      this.changedPos = false;
  }
}

Menu.defaultProps = {
  emptyLabel:"no data..."
};

export default Menu;
