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
    const storeId = this.storeInput.value;
    // there is no page refresh, react uses HTML 5 's PUSH STATE
    this.context.router.transitionTo(`/store/${storeId}`);
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

// context (declare something at the top level, and it will be available to all the lower levels. (available globaly) "surfacing the router from the parent")
// vs props (used to pass data from a parent component to a child component) vs state (used to hold the data of the component)
// on ajoute le router au context du composant
StorePicker.contextTypes = {
  router: React.PropTypes.object
};


//export of the module as default
export default StorePicker;
