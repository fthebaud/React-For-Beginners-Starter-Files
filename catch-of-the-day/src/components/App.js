import React from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
  constructor() {
    //we need to call super first to initialize the react Component
    //we cannot use this before
    super();
    // initial state
    this.state = {
      fishes: {},
      order:{}
    };
  }

  addFish(fish) {

  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh sea food from Public Market"/>
        </div>
        <Order/>
        <Inventory/>
      </div>
    );
  }
}

export default App;
