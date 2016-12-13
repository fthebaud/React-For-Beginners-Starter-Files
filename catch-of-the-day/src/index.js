// importing React. imports are managed in package.json and bundled using webpack
import React from 'react';
// we just need to import the render method from the ReactDom package
import { render } from 'react-dom';

//importing css using webpack
import './css/style.css';


//import de module "homemade". Il faut donner un chemin sinon webpack va chercher dans nodemodules
// import StorePicker from './components/StorePicker';
import App from './components/App';

//rendering the component in the DOM
render(<App/>, document.querySelector('#main'));
