import React from 'react'
import { Spinner, Intent } from '@blueprintjs/core'
import { Switch, Route } from 'react-router-dom'
import _isEmpty from 'lodash/isEmpty'

import APIComboDialog from '../APIComboDialog'
import NavBar from '../../ui/NavBar'
import StatusBar from '../../ui/StatusBar'
import BacktestingView from '../../pages/Backtesting'
import SettingsView from '../../pages/Settings'
import AlgoOrdersView from '../../pages/AlgoOrders'
import TradingView from '../../pages/Trading'

export default class HFUI extends React.Component {
  constructor(props) {
    super(props)

    this.onSubmitKeys = this.onSubmitKeys.bind(this)
  }

  componentDidMount () {
    const { loadInitialSettings, loadAPIKey, cycleBFXConnection } = this.props

    loadInitialSettings()
    loadAPIKey()
    cycleBFXConnection()
  }

  onSubmitKeys({ key, secret } = {}) {
    const { submitAPIKey } = this.props
    submitAPIKey({ key, secret })
  }

  render() {
    const { apiKeyCombo = {} } = this.props

    if (_isEmpty(apiKeyCombo)) {
      return (
        <div className='bp3-dark hfui loading'>
          <Spinner
            intent={Intent.PRIMARY}
            size={Spinner.SIZE_LARGE}
          />
        </div>
      )
    }

    const { key, secret } = apiKeyCombo

    if (!key || !secret) {
      return (
        <div className='bp3-dark hfui'>
          <APIComboDialog
            onSubmit={this.onSubmitKeys}
          />
        </div>
      )
    }

    return (
      <div className='hfui ticker-side dark-theme'>
        <Route component={NavBar} />

        <Switch>
          <Route exact path='/' component={TradingView} />
          <Route path='/t/:sym' component={TradingView} />
          <Route path='/algo-orders' component={AlgoOrdersView} />
          <Route path='/backtesting' component={BacktestingView} />
          <Route path='/settings' component={SettingsView} />
        </Switch>

        <Route component={StatusBar} />
      </div>
    )
  }
}
