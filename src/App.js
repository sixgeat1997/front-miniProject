import React from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import Psulogin from './components/PsuLogin'
import Main from './components/Main'
import 'antd/dist/antd.css';
import Namelist from './components/Namelist';


function App() {

  return (
    <div className="app">
      <Route exact={true} path={'/'} component={Psulogin} />
      <Route exact={true} path={'/main'} component={Main} />
      <Route exact={true} path={'/namelist/'} component={Namelist} />

    </div>
  );
}

export default App;
