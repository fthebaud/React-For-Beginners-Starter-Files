import React from 'react';

import AddFishFom from './AddFishForm';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
  }

  handleOnChange(event, key) {
    const fish = this.props.fishes[key];
    const updatedFish = Object.assign({}, fish);
    const field = event.target;
    updatedFish[field.name] = field.value;
    this.props.updateFish(key, updatedFish);
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input type="text" name="name" placeholder="Fish Name" value={fish.name} onChange={ e => this.handleOnChange(e, key)}></input>
        <input type="text" name="price" placeholder="Fish Price" value={fish.price} onChange={ e => this.handleOnChange(e, key)}></input>
        <select name="status" value={fish.status} onChange={ e => this.handleOnChange(e, key)}>
          <option value="available">Fresh wesh</option>
          <option value="unavailable">Sold out snif</option>
        </select>
        <textarea name="desc" placeholder="Fish Desc" value={fish.desc} onChange={ e => this.handleOnChange(e, key)}></textarea>
        <input type="text" name="image" placeholder="Fish Image" value={fish.image} onChange={ e => this.handleOnChange(e, key)}></input>
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishFom addFish={ this.props.addFish } />
        <button onClick={ this.props.loadSamples } >Load sample fishes</button>
      </div>
    );
  }
}

export default Inventory;
