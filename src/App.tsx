import React, { useEffect } from 'react';
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

function MyApp() {
    return (
        <div id='map_container'>
            <LeftPanel/>
            <MacauMap/>
            <TaipaMap/>
            <ColoaneMap/>
            <Router history={history}>
                <Switch>
                    <Route path='/:placeID/:year?/:faceID?/' component={ImageDisplay}/>
                    <Route path='/' render={() => <></>}/>
                </Switch>
            </Router>
        </div>
    );
}
export default MyApp;
