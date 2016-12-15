import React from 'react';

import AddFishFom from './AddFishForm';

class Inventory extends React.Component {
  render() {
    return (
      <div>
        <h2>Inventory</h2>
        <AddFishFom/>
      </div>
    );
  }
}

export default Inventory;
