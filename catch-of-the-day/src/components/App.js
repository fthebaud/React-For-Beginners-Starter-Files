import React from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

//importing the data
import fishSamples from '../sample-fishes';

class App extends React.Component {
  constructor() {
    //we need to call super first to initialize the react Component
    //we cannot use this before
    super();

    //binding the addFish method to the app
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

    // initial state
    this.state = {
      fishes: {},
      order:{}
    };
  }

  addFish(fish) {
    console.log('addFish');
    // best practice : get a copy of the actual current state and then update the state
    const fishes = { ...this.state.fishes };
    // ajout du poisson
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // updating the state, we inform react that fishes has change (we don't pass in the whole state)
    this.setState({ fishes }); //es6, equivalent to { fishes : fishes }
  }

  addToOrder(fishKey){
    // take a copy of the actual state
    const order = Object.assign({}, this.state.order);
    //add or update the new number of fish
    order[fishKey] = order[fishKey] + 1 || 1;
    // update the state
    this.setState({ order });

  }

  loadSamples() {
    this.setState({ fishes: fishSamples});
  }

  render() {
    // passing down data and functions to child components using props
    // index is for us, key is for react
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh sea food from Public Market"/>
          <ul className="list-of-fishes">
            {
              Object.keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order}/>
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
    );
  }
}

export default App;
