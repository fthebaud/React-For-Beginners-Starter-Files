import React from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

//importing the data
import fishSamples from '../sample-fishes';

//importing the base
import base from '../base';

class App extends React.Component {
  constructor() {
    //we need to call super first to initialize the react Component
    //we cannot use this before
    super();

    //binding the addFish method to the app
    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    // initial state
    this.state = {
      fishes: {},
      order:{}
    };
  }

  //this is a react method (already binded)
  // Runs right before <App> is rendered
  componentWillMount(){
     // setting up two way data binding between your component's state and your Firebase.
    this.ref = base.syncState(`${this.props.params.storeId}/fishes` , //the relative firebase endpoint to which we will bind our state
      {
        context: this, //context of the component
        state: 'fishes' //state property we want to sync with firebase
      }
    );

    //check if there is something in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`) ;
    if (localStorageRef) {
      //update our app component state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);//removes the listener to firebase
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
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

  updateFish(key, updatedFish){
    const fishes = Object.assign({}, this.state.fishes);
    fishes[key] = updatedFish;
    this.setState({fishes});
  }

  removeFish(key){
    const fishes = Object.assign({}, this.state.fishes);
    // delete fishes[key];
    // Since we are hooked up with firebase, we need to set to null. It's a bit weird...
    fishes[key] = null;
    this.setState({fishes});
  }

  addToOrder(fishKey){
    // take a copy of the actual state
    const order = Object.assign({}, this.state.order);
    //add or update the new number of fish
    order[fishKey] = order[fishKey] + 1 || 1;
    // update the state
    this.setState({ order });
  }

  removeFromOrder(key){
    const order = Object.assign({}, this.state.order);
    delete order[key];
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
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}/>
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          loadSamples={this.loadSamples}/>
      </div>
    );
  }
}

App.propTypes = {
  params : React.PropTypes.object.isRequired
};

export default App;
