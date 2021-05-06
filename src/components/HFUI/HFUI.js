import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import PropTypes from 'prop-types'

import SettingsPage from '../../pages/Settings'
import TradingPage from '../../pages/Trading'
import StrategyEditorPage from '../../pages/StrategyEditor'
import MarketDataPage from '../../pages/MarketData'
import AuthenticationPage from '../../pages/Authentication'

import TradingModeModal from '../TradingModeModal'
import BadConnectionModal from '../BadConnectionModal'

import NotificationsSidebar from '../NotificationsSidebar'

import './style.css'

const HFUI = ({
  authToken,
  getSettings,
  notificationsVisible,
  getFavoritePairs,
  currentMode,
  GAPageview,
  getLastVersion,
  currentPage,
}) => {
  useEffect(() => {
    const oneHour = 360000
    getLastVersion()
    setInterval(getLastVersion(), oneHour)
  }, [])

  useEffect(() => {
    GAPageview(currentPage)
  }, [currentPage])

  useEffect(() => {
    if (authToken) {
      getSettings(authToken)
      getFavoritePairs(authToken, currentMode)
    }
  }, [authToken])

  return (
    <>
      {!authToken ? (
        <AuthenticationPage />
      ) : (
        <>
          <Switch>
            <Redirect from='/index.html' to='/' exact />
            <Route path='/' render={() => <TradingPage />} exact />
            <Route path='/strategy-editor' render={() => <StrategyEditorPage />} />
            <Route path='/data' render={() => <MarketDataPage />} />
            <Route path='/settings' render={() => <SettingsPage />} />
          </Switch>
          <TradingModeModal />
          <BadConnectionModal />
        </>
      )}
      <NotificationsSidebar notificationsVisible={notificationsVisible} />
    </>
  )
}

HFUI.propTypes = {
  authToken: PropTypes.string.isRequired,
  currentMode: PropTypes.string.isRequired,
  getSettings: PropTypes.func.isRequired,
  getFavoritePairs: PropTypes.func.isRequired,
  notificationsVisible: PropTypes.bool.isRequired,
  GAPageview: PropTypes.func.isRequired,
  getLastVersion: PropTypes.func.isRequired,
  currentPage: PropTypes.string.isRequired,
}

export default HFUI
