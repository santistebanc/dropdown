var React = require('react');

require('./DropDownAdvanced.less');

var $ = require("jquery");

import SearchFunction from './SearchFunction.js';

var DropDown = React.createClass({
  getInitialState() {
      return {visible: false}
  },
  hide(){
    this.setState({visible:false});
  },
  show(){
    this.setState({visible:true});
  },
  onClickItem(item){
    if(this.props.onClickItem){
      this.props.onClickItem(item);
    }else{
      //if no function onClickItem is supplied log data to console
      console.log("item selected: ",item);
    }
  },
  componentWillReceiveProps(nextProps){
    if(nextProps.manualVisible !== undefined){
      this.setState({visible:nextProps.manualVisible});
    }
  },
  render() {
    let attributes = {hasSearchBar:this.props.hasSearchBar,
      hasSelectMenu:this.props.hasSelectMenu,
      onSelectItem:this.props.onSelectItem,
      onRemoveItem:this.props.onRemoveItem,
      onClickItem:this.onClickItem,
      onLoseFocus:this.hide};
    attributes.data = this.props.data;
    attributes.src = this.props.src;
    let menu = <Menu {...attributes} />;

    if(this.props.children){

      if(this.props.manualVisible !== undefined){
        var childrenWithProps = this.props.children;
      }else{
        var childrenWithProps = React.Children.map(this.props.children, (child) => {
          return React.cloneElement(child, {onClick: this.show});
        });
      }
      return (
            <div className="wrapping-div">
                {childrenWithProps}
                {this.state.visible && menu}
            </div>
        );

    }else{
        if(this.state.visible){
          return menu;
        }else{
          return <div></div>;
        }
    }
  }
});

var Menu = React.createClass( {
  mixins: [
    require('react-onclickoutside')
  ],
  handleClickOutside: function(evt) {
    this.setState({menu_data:undefined,display_menu:false});
    this.props.onLoseFocus();
  },
  getInitialState() {
    return {
      items: [],
      emptyLabel:"No hits",
      searchbar_placeholder:"search...",
      selectedItems:[]
    };
  },
  componentDidMount: function() {
    //call server or not depending on if src or data property was provided
    if(this.props.src){
      //get request to bring all data
      this.serverRequest = $.get(this.props.src, ((result) => {this.setState(result)}).bind(this) );

    }else if(this.props.data){
      this.setState(this.props.data);
    }
  },
  componentWillUnmount: function() {
    this.serverRequest && this.serverRequest.abort();
  },
  componentWillReceiveProps(nextProps){
      this.setState(nextProps.data);
  },
  clickOnSelectedMenu(item){
    this.removeItem(item);
    this.setState({menu_data:undefined,display_menu:false});
  },
  onClickItem(item){
    if(item.items){
      this.changeMenu(item);
    }else{
      this.setState({menu_data:undefined,display_menu:false});
      if(item.selected){
          this.removeItem(item);
      }else{
        this.selectItem(item);
      }
    }
  },
  selectItem(item){
    console.log("select",this.state.title);
    item.selected = true;
    this.setState({selectedItems:[...this.state.selectedItems,item]});
    if(this.props.onSelectItem){
      this.props.onSelectItem(item);
    }
  },
  removeItem(item){
    console.log("remove",this.state.title);
    item.selected = false;
    let index = this.state.selectedItems.indexOf(item);
    let arr = this.state.selectedItems.slice(0);
    arr.splice(index,1);
    this.setState({selectedItems:arr});
    if(this.props.onRemoveItem){
      this.props.onRemoveItem(item);
    }
  },
  changeMenu(data){
      this.setState({menu_data:data,display_menu:true});
  },
  render() {
    let filtered_items = this.state.items.filter(function(i) { return i.selected });
    return (
      <div className={"drop-down-tag"} style={this.state.width?{width:this.state.width}:{}}>
        <section>
          {this.state.title && <h4>{this.state.title}</h4>}
          {this.props.hasSelectMenu && <StaticMenu data={this.state.selectedItems} onClickItem={this.clickOnSelectedMenu}/>}
          {this.props.hasSearchBar && <SearchBar data={this.state.items} placeholder={this.state.searchbar_placeholder} onSelect={this.changeMenu} autoFocus/>}
          {this.state.items && this.state.items.length>0?
          <ul>{this.state.items.map((item, idx) => <Item key={idx} data={item} onClickItem={this.onClickItem}>
            {this.state.customItem && this.state.customItem(item)}
          </Item>)}</ul>
          :
          <p className={"empty-label"}>{this.state.emptyLabel}</p>}
        </section>
        <DropDown data={this.state.menu_data} onClickItem={this.props.onClickItem} onSelectItem={this.selectItem} onRemoveItem={this.removeItem} manualVisible={this.state.display_menu}/>
      </div>
    );
  }
});

var StaticMenu = React.createClass( {
  onClickItem(item){
    this.props.onClickItem(item);
  },
  customItem(item){
    return <span><a>{icon("remove")}</a><a>{icon(item.icon)}{item.title}</a></span>;
  },
  render() {
    if(this.props.data && this.props.data.length>0){
      return (
            <ul className={"selected-menu"}>
              {this.props.data.map((item, idx) => <Item key={idx} data={item} onClickItem={this.onClickItem}>{this.customItem(item)}</Item>)}
            </ul>
      );
    }
    return <p className={"empty-label"}>...</p>;
  }
});

var Item = React.createClass({
  onClick(){
    if(this.props.onClickItem){
      this.props.onClickItem(this.props.data);
    }
  },
  handleKeyPress(e){;
    console.log("key");
  },
  render() {
    const data = this.props.data;
    const inside = this.props.children?this.props.children:<a>{icon(data.icon)}{data.title}{data.items && caret()}</a>;
    const element = this.props.data.selected?<span className="menu-light">{inside}</span>:inside;
    return <li onClick={this.onClick}>{element}</li>;
  }
});

var SearchBar = React.createClass({
  getInitialState() {
    return {
      value: "",
      results:[]
    };
  },
  onChange(event){
    let newvalue = event.target.value;
    this.setState({value:newvalue});
    if(newvalue.length>0){
      this.searchInput(newvalue);
    }
  },
  onFocus(event){
    let newvalue = event.target.value;
    if(newvalue.length>0){
      this.searchInput(newvalue);
    }
  },
  searchInput(value){
    let search_results = SearchFunction(this.props.data,value);
    let res = {};
    res.items = search_results;
    res.customItem = function(item){
      let path_output = [];
        item.path.forEach((it,idx)=>{
          var slot = [icon(it.icon),it.title,icon("caret-right")];
          path_output.push(...slot);
        });
        let formated_title = formatText(item.title,item.mark_pos,value.length);
        let item_output = [icon(item.icon),formated_title];
      return <a><span className="menu-light">{path_output}</span>{item_output}</a>;
    };
    this.setState({results:res});
    this.props.onSelect(res);
  },
  render(){
    return(
      <input type="text" value={this.state.value} placeholder={this.props.placeholder} autoFocus={this.props.autoFocus} onChange={this.onChange} onFocus={this.onFocus}/>
    );
  }
});



function formatText(string,positions,size){
  let result = [];
  let start = 0;
  let pos = 0;

  for(let i=0;i<positions.length;i++){
    let first = string.slice(start,positions[i]);
    let second = <b>{string.substr(positions[i],size)}</b>;
    let third = string.slice(positions[i]+size);
    result.push([first,second]);
    start = positions[i]+size;
    if(i == positions.length-1){
      result.push(third);
    }
  }
  return result;
}

function icon(iconName) {
  if (iconName) {
    const iconcss = "side-icon fa fa-" + iconName;
    return <i className={iconcss}></i>;
  }
}
function caret() {
    return <i className={"caret fa fa-caret-right"}></i>;
}

module.exports = DropDown;
