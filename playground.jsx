var React = require('react');
import ReactDOM from 'react-dom';
import DropDown from './src/components/DropDown.jsx';

let searchbarprops = {placeholder:"search..."};
let selectableprops = {menuofselected:true};

let mock = {
  "title":"My drop-down menu with maybe a very long title",
  "emptyLabel":"no items found",
  "selectable":{"menuofselected":true,"menuOfSelectedMaxHeight":100},
  "searchbar":{"placeholder":"search...","searchMenuWidth":150,"searchMenuMaxHeight":150},
  "width":180,
  "dropdownPosition":'bottom',
  "optionsMaxHeight":200,
  "showExpandButton":true,
  "selectedItems":[],
  "items":[{"title":"colors","id":"colors","icon":"paint-brush","optionsMaxHeight":200,"width":100,"items":[
    {"title":"red"},
    {"title":"blue"},
    {"title":"yellow"},
    {"title":"green","optionsMaxHeight":200,"width":70,"items":[{"title":"lime"},{"title":"leaf"},{"title":"mint","width":80,"items":[{"title":"mint light"},{"title":"mint dark"}]}]}
    ]},
    {"title":"countries","icon":"globe","optionsMaxHeight":200,"width":100,"items":[
      {"title":"germany with many other words"},
      {"title":"france"},
      {"title":"usa"},
      {"title":"italy"}
    ]},{"title":"another item"}]
};


var Index = React.createClass({
    render() {
        return (
            <div className="component-documentation">
                <h1>MultiDropDown</h1>
                <br / >
                <br / >
                <div style={{width:'10%', margin:'auto', float:'right'}}>
                  <DropDown data={mock}><button>Button</button></DropDown>
                </div>
                <div style={{width:'10%', marginLeft:'200px', float:'left'}}>
                  <DropDown data={mock}><button>Button</button></DropDown>
                </div>
                <br / >
                <div style={{width:'10%', margin:'auto', float:'left'}}>
                  <DropDown data={mock}><a>Link</a></DropDown>
                </div>
                <div style={{marginRight:'50px', float:'right'}}>
                  <DropDown data={mock}><button>Button</button></DropDown>
                </div>
                <div style={{height:'300px'}}></div>
                <div style={{marginRight:'50px', float:'right'}}>
                  <DropDown data={mock}><button>Button</button></DropDown>
                </div>
                <div style={{width:'5%', marginLeft:'200px', float:'left'}}>
                  <DropDown data={mock}><button>Button</button></DropDown>
                </div>
                  <div style={{height:'300px'}}></div>
                <div style={{marginRight:'50px', float:'right'}}>
                  <DropDown data={mock}><button>Button</button></DropDown>
                </div>
                <div style={{width:'5%', marginLeft:'200px', float:'left'}}>
                  <DropDown data={mock}><button>Button</button></DropDown>
                </div>
            </div>
        );
    }
});

ReactDOM.render(<Index/>, document.getElementById('root'));
