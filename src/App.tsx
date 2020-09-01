import React from 'react';
import { Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import { LeftPanel, RightPanel } from './components/scaffold/index';
import { ImageDisplay } from './components/imageDisplay/imageDisplay';
import style from './components/scaffold/scaffold.module.css';
import './css/global.css';
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();
(window as any)._history = history; 

function App() {
  return (
      <Router history={history}>
          <div className={style.app}>
              <RightPanel/>
              <LeftPanel/>
              <Route path='/:id' render={({ match: { params }}) => <ImageDisplay id={params.id} />}/>
          </div>
      </Router>
  );
}

export default App;
