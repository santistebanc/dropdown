var React = require('react');
import ReactDOM from 'react-dom';
import DropDown from './src/components/DropDownAdvanced.jsx';

var Index = React.createClass({
  dropcustom(item){
    console.log("this is the custom method");
  },
    render() {
        return (
            <div className="component-documentation">
                <h1>MultiDropDown</h1>
                <br / >
                <br / >
                  <DropDown src={"/data"} hasSearchBar><button>Button</button></DropDown>
                <br / >
                <br / >
                  <DropDown src={"/data"} onSelect={this.dropcustom}><a href="#">Link with custom method</a></DropDown>
                <br / >
                <br / >
                  <DropDown src={"/data"}><input type="button" value="Input button"/></DropDown>
            </div>
        );
    }
});

ReactDOM.render(<Index/>, document.getElementById('root'));
