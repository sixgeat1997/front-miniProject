import React from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import Psulogin from './components/PsuLogin'
import Main from './components/Main'
import 'antd/dist/antd.css';


function App() {

  return (
    <div className="font">
      <Route exact={true} path={'/'} component={Psulogin} />
      <Route exact={true} path={'/main'} component={Main} />

    </div>
  );
}

export default App;
