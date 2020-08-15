import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LeftPanel, RightPanel, MenuBar } from './components/scaffold/index';
import style from './components/scaffold/scaffold.module.css';
import './css/global.css';

function App() {
  return (
      <BrowserRouter>
          <div className={style.app}>
              <MenuBar/>
              <LeftPanel/>
              <RightPanel/>
          </div>
      </BrowserRouter>
  );
}

export default App;
