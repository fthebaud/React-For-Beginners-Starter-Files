import React from 'react';

import AddFishFom from './AddFishForm';

import Base from '../base';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.state = {
      uid: null,
      owner: null
    };
  }

  componentDidMount(){
    Base.onAuth((user) => {
      if (user) {
        this.authHandler(null, { user });
      }
    });
  }

  handleOnChange(event, key) {
    const fish = this.props.fishes[key];
    const updatedFish = Object.assign({}, fish);
    const field = event.target;
    updatedFish[field.name] = field.value;
    this.props.updateFish(key, updatedFish);
  }

  authenticate(provider) {
    console.log(`authenticate ${provider}`);
    // authHandler : callback after authentiation
    Base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
    Base.unauth();
    this.setState({ uid: null });
  }

  authHandler(err, authData) {
    console.log('authHandler', err, authData);

    if (err) {
      console.log(err);
      return;
    }

    //grab the store info
    const storeRef = Base.database().ref(this.props.storeId);

    //query the firebase once for the store data
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      // claim it as our own if there is no owner already
      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }

      //set it locally
      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });

    });

  }

  renderLogin() {
    return (
      <nav>
        <h2>Inventory</h2>
        <p>Sing in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate('github')}>Log in with github</button>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>Log in with facebook</button>
        <button className="twitter" onClick={() => this.authenticate('twitter')}>Log in with twitter</button>
      </nav>
    );
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
    const logout = <button onClick={this.logout}>Log me out scotty</button>;

    // check if the user is logged in
    if (!this.state.uid) {
      return (
        <div>{this.renderLogin()}</div>
      );
    }

    // check if they are the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, your are not the owner of this store</p>
          {logout}
        </div>
      );
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishFom addFish={ this.props.addFish } />
        <button onClick={ this.props.loadSamples } >Load sample fishes</button>
      </div>
    );
  }
}

Inventory.propTypes = {
  fishes : React.PropTypes.object.isRequired,
  updateFish : React.PropTypes.func.isRequired,
  removeFish : React.PropTypes.func.isRequired,
  addFish : React.PropTypes.func.isRequired,
  loadSamples : React.PropTypes.func.isRequired,
  storeId : React.PropTypes.string.isRequired
};


export default Inventory;
