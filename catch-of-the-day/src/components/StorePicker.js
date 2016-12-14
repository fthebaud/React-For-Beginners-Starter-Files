// importing React. imports are managed in package.json and bundled using webpack
import React from 'react';

// import helper
import { getFunName } from '../helpers';

// creation of the component using es6 classes
class StorePicker extends React.Component {

  // BINDING, méthode A : ugly but n store pickers => they all reference one function
  // binding des fonctions "homemade" au this dans le constructor
  // remarque : render est déjà bindé
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }

  goToStore(event) {
    // stopping the form from submitting
    event.preventDefault();
    console.log('go to', this.storeInput.value);
  }

  // rendering some html. function is written "es6 style" (render() = function render())
  render() {
    return (
      // using className instead of class because class is a reserved word in javascript
      // We can only return on parent html element !

      // BINDING, méthode B : n store pickers, we create n functions ??  Cf video 11 wes bos, but I have my doubts about that
      // <form className="store-picker" onSubmit={this.goToStore.bind(this)}>
      <form className="store-picker" onSubmit={(e) => this.goToStore(e) }>
        <h2>Please enter a store name</h2>
        <input type="text" placeholder="Store Name" defaultValue={getFunName()}
          ref={ (input) => { this.storeInput = input; }} required/>
        <button type="submit">Visit store</button>
      </form>
    );
  }
}

//export of the module as default
export default StorePicker;
