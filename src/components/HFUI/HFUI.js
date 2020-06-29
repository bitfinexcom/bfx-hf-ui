import React from 'react'
import { Route, Switch, Redirect } from 'react-router'

import SettingsPage from '../../pages/Settings'
import TradingPage from '../../pages/Trading'
import StrategyEditorPage from '../../pages/StrategyEditor'
import MarketDataPage from '../../pages/MarketData'
import AuthenticationPage from '../../pages/Authentication'

import Navbar from '../Navbar'
import NotificationsSidebar from '../NotificationsSidebar'

import { propTypes, defaultProps } from './HFUI.props'
import './style.css'

export default class HFUI extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  componentDidUpdate() {
    const { GAPageview } = this.props
    GAPageview(window.location.pathname)
  }

  render() {
    const {
      authToken, getLastVersion, getSettings, notificationsVisible,
    } = this.props
    const oneHour = 360000
    getLastVersion()
    if (authToken) {
      getSettings(authToken)
    }
    setInterval(getLastVersion(), oneHour)
    if (!authToken) {
      return (
        <div className='hfui-app'>
          <AuthenticationPage />
          <NotificationsSidebar />
        </div>
      )
    }

    return (
      <div className='hfui-app'>
        <Navbar />

        <Switch>

          <Redirect exact from='/index.html' to='/' />

          <Route
            exact
            path='/'
            render={() => (
              <TradingPage />
            )}
          />

          <Route
            path='/strategy-editor'
            render={() => (
              <StrategyEditorPage />
            )}
          />

          <Route
            path='/data'
            render={() => (
              <MarketDataPage />
            )}
          />
          <Route
            path='/settings'
            render={() => (
              <SettingsPage />
            )}
          />
        </Switch>

        <NotificationsSidebar notificationsVisible={notificationsVisible} />
      </div>
    )
  }
}
