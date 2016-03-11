var React = require('react');
import ReactDOM from 'react-dom';
import DropDown from './src/components/DropDownAdvanced.jsx';

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
                  <DropDown src={"/data"} hasSearchBar hasSelectMenu><button ref="but1">Button</button></DropDown>
                <br / >
                <br / >
            </div>
        );
    }
});

ReactDOM.render(<Index/>, document.getElementById('root'));
