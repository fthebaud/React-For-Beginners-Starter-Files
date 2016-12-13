// importing React. imports are managed in package.json and bundled using webpack
import React from 'react';

// creation of the component using es6 classes
class StorePicker extends React.Component {
  // rendering some html. function is written "es6 style" (render() = function render())
  render() {
    return (
      // using className instead of class because class is a reserved word in javascript
      // We can only return on parent html element !
      <form className="store-picker">
        <h2>Please enter a store name</h2>
        <input type="text" placeholder="Store Name" required/>
        <button type="submit">Visit store</button>
      </form>
    );
  }
}

//export of the module as default
export default StorePicker;
