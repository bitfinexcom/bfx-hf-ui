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
  currentPage,
  onUnload,
  subscribeAllTickers,
}) => {
  const unloadHandler = () => {
    if (authToken !== null) {
      onUnload(authToken, currentMode)
    }
  }

  useEffect(() => {
    window.removeEventListener('beforeunload', unloadHandler)
    window.addEventListener('beforeunload', unloadHandler)
    return () => {
      window.removeEventListener('beforeunload', unloadHandler)
    }
  }, [authToken, currentMode])

  useEffect(() => {
    GAPageview(currentPage)
  }, [currentPage])

  useEffect(() => {
    if (authToken) {
      getSettings(authToken)
      getFavoritePairs(authToken, currentMode)
      subscribeAllTickers()
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
  authToken: PropTypes.string,
  currentPage: PropTypes.string,
  currentMode: PropTypes.string.isRequired,
  getSettings: PropTypes.func.isRequired,
  getFavoritePairs: PropTypes.func.isRequired,
  onUnload: PropTypes.func.isRequired,
  notificationsVisible: PropTypes.bool.isRequired,
  GAPageview: PropTypes.func.isRequired,
  subscribeAllTickers: PropTypes.func.isRequired,
}

HFUI.defaultProps = {
  authToken: '',
  currentPage: '',
}

export default HFUI
