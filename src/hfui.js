import React from 'react'
import { Switch, Route } from 'react-router-dom'

import NavBar from './ui/NavBar'
import StatusBar from './ui/StatusBar'
import BacktestingView from './pages/Backtesting'

export default class HFUI extends React.Component {
  render () {
    return (
      <div className='bp3-dark'>
        <Route component={NavBar} />
        <Switch>
          <Route path="/" component={BacktestingView} />
        </Switch>
        <Route component={StatusBar} />
      </div>
    )
  }
}
