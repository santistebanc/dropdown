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
  onSelect(item){
    if(this.props.onSelect){
      this.props.onSelect(item);
    }else{
      //if no function onSelect is supplied log data to console
      console.log("item selected: ",item);
    }
  },
  componentWillReceiveProps(nextProps){
    if(nextProps.manualVisible !== undefined){
      this.setState({visible:nextProps.manualVisible});
    }
  },
  render() {
    if(this.props.manualVisible !== undefined){
      var childrenWithProps = this.props.children;
    }else{
      var childrenWithProps = React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {onClick: this.show});
      });
    }
    let attributes = {hasSearchBar:this.props.hasSearchBar,
                      onSelect:this.onSelect,
                      onLoseFocus:this.hide
                     };
      attributes.data = this.props.data;
      attributes.src = this.props.src;
      return (
          <div className="wrapping-div">
              {childrenWithProps}
              {this.state.visible && <Menu {...attributes} />}
          </div>
      );
  }
});

var Menu = React.createClass( {
  mixins: [
    require('react-onclickoutside')
  ],
  handleClickOutside: function(evt) {
    this.props.onLoseFocus();
  },
  getInitialState() {
    return {
      items: [],
      emptyLabel:"No hits",
      searchbar_placeholder:"search..."
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
  render() {
    return (
      <div className={"drop-down-tag"}>
        <section>
          {this.state.title && <h4>{this.state.title}</h4>}
          {this.props.hasSearchBar && <SearchBar data={this.state.items} placeholder={this.state.searchbar_placeholder} onSelect={this.props.onSelect} autoFocus/>}
          {this.state.items && this.state.items.length>0?
          <ul>{this.state.items.map((item, idx) => <Item key={idx} data={item} onSelect={this.props.onSelect}>{this.state.customItem && this.state.customItem(item)}</Item>)}</ul>
          :
          <p className={"empty-label"}>{this.state.emptyLabel}</p>}
        </section>
      </div>
    );
  }
});

var Item = React.createClass({
  onClick(){;
    this.props.onSelect(this.props.data);
  },
  handleKeyPress(e){;
    console.log("key");
  },
  render() {
    const data = this.props.data;
    const inside = this.props.children?this.props.children:<a>{icon(data.icon)}{data.title}{data.items && caret()}</a>;
    const element = <li onClick={this.onClick}>{inside}</li>;
    if(data.items){
      return <DropDown data={data} onSelect={this.props.onSelect}>{element}</DropDown>;
    }else{
      return element;
    }
  }
});

var SearchBar = React.createClass({
  getInitialState() {
    return {
      value: "",
      display_results: false,
      results:[]
    };
  },
  onChange(event){
    let newvalue = event.target.value;
    this.setState({value:newvalue});
    this.setState({display_results:newvalue.length>0});
    this.searchInput(newvalue);
  },
  onFocus(event){
    let newvalue = event.target.value;
    this.setState({display_results:newvalue.length>0});
    this.searchInput();
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
  },
  render(){
    return(
      <DropDown manualVisible={this.state.display_results} data={this.state.results} onSelect={this.props.onSelect}>
          <input type="text" value={this.state.value} placeholder={this.props.placeholder} autoFocus={this.props.autoFocus} onChange={this.onChange} onFocus={this.onFocus}/>
      </DropDown>
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
