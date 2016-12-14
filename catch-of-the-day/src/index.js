// importing React. imports are managed in package.json and bundled using webpack
import React from 'react';
// we just need to import the render method from the ReactDom package
import { render } from 'react-dom';
// import stuff for routing
import { BrowserRouter, Match, Miss } from 'react-router';


//importing css using webpack
import './css/style.css';


//import de module "homemade". Il faut donner un chemin sinon webpack va chercher dans nodemodules
import StorePicker from './components/StorePicker';
import App from './components/App';
import NotFound from './components/NotFound';

const Root = () => {
  return (
      <BrowserRouter>
        <div>
          <Match exactly pattern="/" component={StorePicker} />
          <Match pattern="/store/:storeId" component={App} />
          <Miss component={NotFound}/>
        </div>
      </BrowserRouter>
  );
};


//rendering the component in the DOM
render(<Root/>, document.querySelector('#main'));
