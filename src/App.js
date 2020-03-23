import React, { useState } from 'react'
import PsuLogin from './component/PsuLogin'
import Main from './component/Main'
import { Switch, Route, Link, Router } from 'react-router-dom'
import { history } from './_helpers/History';

const App = () => {



  return (
    <div  >
      <Switch>
        <Router history={history}>

          <Route exact path="/" component={PsuLogin} />
          <Route path="/main/" component={Main} />

        </Router>

      </Switch>
    </div>
  )


}

export default App;