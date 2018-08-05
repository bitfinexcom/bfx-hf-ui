import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from './ui/Navbar'
import BacktestingView from './pages/Backtesting'

export default class HFUI extends React.Component {
  render () {
    return (
      <div>
        <Route component={Navbar} />
        <Switch>
          <Route path="/" component={BacktestingView} />
        </Switch>
      </div>
    )
  }
}
