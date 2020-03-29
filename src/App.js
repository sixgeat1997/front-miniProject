import React, { useState } from 'react'
import PsuLogin from './component/PsuLogin'
import Main from './component/Main'
import { Switch, Route, Link, Router } from 'react-router-dom'
import { history } from './_helpers/History';
import 'antd/dist/antd.css';
import './App.css'
// import

const App = () => {



  return (
    <div className="app" >

      <Router history={history}>
        <Switch>
          <Route exact path="/" component={PsuLogin} />
          <Route path="/main/" component={Main} />
        </Switch>
      </Router>


    </div>
  )


}

export default App;