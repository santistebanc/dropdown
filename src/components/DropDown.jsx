import React from 'react';
import Menu from './Menu.jsx';
import GetDimensionsOfElement from './GetDimensionsOfElement';
var Mousetrap = require("mousetrap/mousetrap.js");

require('./DropDown.less');

let ClickOutHandler = require('react-onclickout');

class DropDown extends React.Component {
  constructor(props) {
      super(props);
      this.state = {menuVisible: false};
      this.allitems = extractAllItems(props.data);
    }
    showMenu() {
      this.setState({menuVisible:true});
      Mousetrap.prototype.stopCallback = function(e, element, combo) {
        //console.log(element);
        return false;
      };
    }
    hideMenu() {
      this.setState({menuVisible:false});
    }
    handleClickElement(evt) {
      if(this.state.menuVisible){
        this.hideMenu();
      }else{
        this.showMenu();
      }
    }
    handleClickOutside(evt) {
      this.hideMenu();
    }
    findDimensions(input){
        if (input != null) {
          this.el = input;
          let dim = GetDimensionsOfElement(input);
          let dimwindow = GetDimensionsOfElement(window);
          let menuwidth = this.props.data.width || 70;
          if(dim.x+dim.w+menuwidth > dimwindow.w){
            this.positionMenu = {x:dim.x-menuwidth,y:dim.y};
          }else{
            this.positionMenu = {x:dim.x+dim.w,y:dim.y};
          }
        }
    }
    render() {

      var { children, async, onClose, ...other } = this.props;

      //transforms whichever child elements to become clickable
      var childrenWithProps = React.Children.map(children, (child) => {
          return React.cloneElement(child, {onClick: this.handleClickElement.bind(this), ref:this.findDimensions.bind(this)});
      });
      let menu = <Menu main el={this.el} onClose={this.hideMenu.bind(this)} allItems={this.allitems} {...other} />;

      return <ClickOutHandler onClickOut={this.handleClickOutside.bind(this)}>{childrenWithProps}{this.state.menuVisible && menu}</ClickOutHandler>;
    }
}

function extractAllItems(data){
  let list = [];
  recursiveSearch(data);
  return list;
  function recursiveSearch(data){
    if(data.items && data.items.length>0){
      for(let i=0;i<data.items.length;i++){
        let res = recursiveSearch(data.items[i]);
        res && list.push(res);
      }
    }else{
      return data;
    }
  }
}

export default DropDown;
