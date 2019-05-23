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

import './style.css'

export default class HFUI extends React.Component {
  constructor(props) {
    super(props)

    this.onSubmitKeys = this.onSubmitKeys.bind(this)
  }

  componentDidMount() {
    const { loadAPIKey, cycleBFXConnection } = this.props
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
        <div className='bp3-dark hfui'>
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
      <div className='bp3-dark hfui'>
        <Route component={NavBar} />

        <Switch>
          <Route path='/algo-orders' component={AlgoOrdersView} />
          <Route path='/backtesting' component={BacktestingView} />
          <Route path='/settings' component={SettingsView} />
        </Switch>

        <Route component={StatusBar} />
      </div>
    )
  }
}
