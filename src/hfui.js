import React from 'react'
import { Switch, Route } from 'react-router-dom'

import NavBar from './ui/NavBar'
import StatusBar from './ui/StatusBar'
import BacktestingView from './pages/Backtesting'
import SettingsView from './pages/Settings'

export default class HFUI extends React.Component {
  render () {
    return (
      <div className='bp3-dark'>
        <Route component={NavBar} />

        <Switch>
          <Route path='/backtesting' component={BacktestingView} />
          <Route path='/settings' component={SettingsView} />
        </Switch>

        <Route component={StatusBar} />
      </div>
    )
  }
}
