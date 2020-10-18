import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { macauProperties } from './data/geoJSONData_macau';

window.face_arrows = {};
window.data_hash = macauProperties.reduce((a: any, el: any) => {
    const id = el.properties.id;
    a[id] = el;
    return a;
}, {});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
