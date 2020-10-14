import React from 'react';
import { Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import { LeftPanel } from './components/scaffold/index';
import { ImageDisplay } from './components/imageDisplay/imageDisplay';
import style from './components/scaffold/scaffold.module.css';
import './css/global.css';
import './components/map/map.css';
import { MacauMap, TaipaMap, ColoaneMap } from './components/map/map';
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();
window._history = history; 

//function App() {
//  return (
//      <Router history={history}>
//          <div className={style.app}>
//              <RightPanel/>
//              <LeftPanel/>
//              <Route path='/:id' render={({ match: { params }}) => <ImageDisplay id={params.id} />}/>
//          </div>
//      </Router>
//  );
//}

function MyApp() {
    //return <div style={{ width: '100vw', height: '100vh' }}>
    //    <MacauMap/>
    //</div>;
    return (
        <div id='map_container'>
            <LeftPanel/>
            <MacauMap/>
            <TaipaMap/>
            <ColoaneMap/>
        </div>
    );
}
export default MyApp;
