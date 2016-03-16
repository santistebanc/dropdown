var React = require('react');
import ReactDOM from 'react-dom';
import DropDown from './src/components/DropDown.jsx';

let mock = {
  "title":"My drop-down menu",
  "config":[],
  "emptyLabel":"no items found",
  "width":"200px",
  "items":[{"title":"colors","id":"colors","icon":"paint-brush","items":[
    {"title":"red","id":"color_red"},
    {"title":"blue","id":"color_blue"},
    {"title":"yellow","id":"color_yellow"},
    {"title":"green","id":"color_green","items":[{"title":"lime","id":"color_green_lime"},{"title":"leaf","id":"color_green_leaf"},{"title":"mint","id":"color_green_mint"}]}
    ]},
    {"title":"countries","id":"countries","icon":"globe","items":[
      {"title":"germany","id":"country_germany"},
      {"title":"france","id":"country_france"},
      {"title":"usa","id":"country_usa"},
      {"title":"italy","id":"country_italy"}
      ]}]
};


let searchbarprops = {placeholder:"search...", autoFocus:true};



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
                  <DropDown data={mock} searchbar={searchbarprops}><button>Button</button></DropDown>
                <br / >
                <br / >
            </div>
        );
    }
});

ReactDOM.render(<Index/>, document.getElementById('root'));
