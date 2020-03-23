import React, { useState } from 'react'
import PsuLogin from './component/PsuLogin'
import Main from './component/Main'
import { Switch, Route, Link } from 'react-router-dom'


const App = () => {



  return (
    <div  >
      <Switch>
        <Route exact path="/" component={PsuLogin} />
        <Route path="/main/" component={Main} />
      
        
      </Switch>
    </div>
  )


}

export default App;