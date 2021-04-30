import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import PropTypes from 'prop-types'

import SettingsPage from '../../pages/Settings'
import TradingPage from '../../pages/Trading'
import StrategyEditorPage from '../../pages/StrategyEditor'
import MarketDataPage from '../../pages/MarketData'
import AuthenticationPage from '../../pages/Authentication'

import Navbar from '../Navbar'
import NotificationsSidebar from '../NotificationsSidebar'

import './style.css'

const HFUI = ({
  authToken, getSettings, notificationsVisible, getFavoritePairs, currentMode, GAPageview,
}) => {
  useEffect(() => {
    GAPageview(window.location.pathname)
  })

  useEffect(() => {
    if (authToken) {
      getSettings(authToken)
      getFavoritePairs(authToken, currentMode)
    }
  }, [authToken])

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
        <Redirect from='/index.html' to='/' exact />

        <Route
          path='/'
          component={TradingPage}
          exact
        />

        <Route
          path='/strategy-editor'
          component={StrategyEditorPage}
        />

        <Route
          path='/data'
          component={MarketDataPage}
        />

        <Route
          path='/settings'
          component={SettingsPage}
        />
      </Switch>

      <NotificationsSidebar notificationsVisible={notificationsVisible} />
    </div>
  )
}

HFUI.propTypes = {
  authToken: PropTypes.string,
  currentMode: PropTypes.string,
  getSettings: PropTypes.func,
  getFavoritePairs: PropTypes.func,
  notificationsVisible: PropTypes.bool,
  GAPageview: PropTypes.func,
}

HFUI.defaultProps = {
  authToken: '',
  currentMode: '',
  getSettings: () => {},
  getFavoritePairs: () => {},
  notificationsVisible: false,
  GAPageview: () => {},
}

export default HFUI
