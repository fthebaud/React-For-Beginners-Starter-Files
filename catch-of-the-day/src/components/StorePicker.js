// importing React. imports are managed in package.json and bundled using webpack
import React from 'react';

//creation of the component using es6 classes
class StorePicker extends React.Component {
  //rendering some html. function is written "es6 style" (render() = function render())
  render() {
      return <p>truc</p>;
  }
}

//export of the module as default
export default StorePicker;
