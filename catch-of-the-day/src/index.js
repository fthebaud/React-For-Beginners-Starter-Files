// importing React. imports are managed in package.json and bundled using webpack
import React from 'react';
// we just need to import the render method from the ReactDom package
import { render } from 'react-dom';

//import du module StorePicker. Il faut donner un chemin sinon webpack va chercher dans nodemodules
import StorePicker from './components/StorePicker';

//rendering the component in the DOM
render(<StorePicker/>, document.querySelector('#main'));
