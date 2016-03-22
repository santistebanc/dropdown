var React = require('react');
import ReactDOM from 'react-dom';
import DropDown from './src/components/DropDown.jsx';

let mock = {
  "title":"My drop-down menu with maybe a very long title",
  "emptyLabel":"no items found",
  "width":150,
  "dropdownPosition":'bottom',
  "searchMenuWidth":150,
  "searchMenuMaxHeight":150,
  "optionsMaxHeight":200,
  "menuOfSelectedMaxHeight":100,
  "selectedItems":[],
  "items":[{"title":"colors","id":"colors","icon":"paint-brush","optionsMaxHeight":200,"width":100,"items":[
    {"title":"red","id":"color_red"},
    {"title":"blue","id":"color_blue"},
    {"title":"yellow","id":"color_yellow"},
    {"title":"green","id":"color_green","optionsMaxHeight":200,"width":70,"items":[{"title":"lime","id":"color_green_lime"},{"title":"leaf","id":"color_green_leaf"},{"title":"mint","id":"color_green_mint"}]}
    ]},
    {"title":"countries","id":"countries","icon":"globe","optionsMaxHeight":200,"width":100,"items":[
      {"title":"germany with many other words","id":"country_germany"},
      {"title":"france","id":"country_france"},
      {"title":"usa","id":"country_usa"},
      {"title":"italy","id":"country_italy"}
    ]},{"title":"another item","id":"another"}]
};


let searchbarprops = {placeholder:"search...", autoFocus:true};
let selectableprops = {menuofselected:true};


var Index = React.createClass({
  dropcustom(item){
    console.log("this is the custom method");
  },
    render() {
      //<DropDown el={"but1"} src={"/data"} hasSearchBar />
        return (
            <div className="component-documentation">
                <h1>MultiDropDown</h1>
                <br / >
                <br / >
                  <div style={{width:'10%', margin:'auto', float:'right'}}><DropDown data={mock} selectable={selectableprops} searchbar={searchbarprops}><button>Button</button></DropDown></div>
                  <div style={{width:'10%', marginLeft:'200px', float:'left'}}><DropDown data={mock} selectable={selectableprops} searchbar={searchbarprops}><button>Button</button></DropDown></div>
                <br / >
                  <div style={{marginRight:'50px', float:'right'}}><DropDown data={mock} selectable={selectableprops} searchbar={searchbarprops}><button>Button</button></DropDown></div>
                <div style={{height:'200px'}}></div>
                                    <div style={{marginRight:'50px', float:'right'}}><DropDown data={mock} selectable={selectableprops} searchbar={searchbarprops}><button>Button</button></DropDown></div>
                                    <div style={{width:'5%', marginLeft:'200px', float:'left'}}><DropDown data={mock} selectable={selectableprops} searchbar={searchbarprops}><button>Button</button></DropDown></div>
                                  </div>
        );
    }
});

ReactDOM.render(<Index/>, document.getElementById('root'));
