import React from 'react'
import { Spinner, Intent } from '@blueprintjs/core'
import { Route, Redirect } from 'react-router-dom'
import _isEmpty from 'lodash/isEmpty'
import { NotificationContainer } from 'react-notifications'

import APIComboDialog from '../APIComboDialog'
import SideNavBar from '../../ui/SideNavBar'
import StatusBar from '../../ui/StatusBar'
import AlgoOrdersView from '../../pages/AlgoOrders'
import SettingsView from '../../pages/Settings'
import { propTypes } from './HFUI.props'

export default class HFUI extends React.Component {
  static propTypes = propTypes

  constructor(props) {
    super(props)

    this.onSubmitKeys = this.onSubmitKeys.bind(this)
  }

  componentDidMount() {
    const { loadInitialSettings, loadAPIKey, cycleBFXConnection, getLastVersion } = this.props

    loadInitialSettings()
    loadAPIKey()
    cycleBFXConnection()
    getLastVersion()
    // keep trying to load api keys
    const reloadKeys = () => {
      const { apiKeyCombo = {} } = this.props
      if (!_isEmpty(apiKeyCombo)) return
      loadAPIKey()
      setTimeout(reloadKeys, 5000)
    }
    reloadKeys()
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

    /*
      <Route exact path='/index.html' component={DashboardView} />  used for an electron app
    */
    return (
      <div className='hfui'>
        <div className='hfui_content__wrapper'>
          <NotificationContainer />
          <Route component={SideNavBar} />
          <Redirect exact from='/' to='/algo-orders' />
          <Route path='/algo-orders' component={AlgoOrdersView} />
          <Route path='/settings' component={SettingsView} />
        </div>

        <Route component={StatusBar} />
      </div>
    )
  }
}
