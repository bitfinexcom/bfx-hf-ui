import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router'

import SettingsPage from '../../pages/Settings'
import TradingPage from '../../pages/Trading'
import StrategyEditorPage from '../../pages/StrategyEditor'
import MarketDataPage from '../../pages/MarketData'
import AuthenticationPage from '../../pages/Authentication'

import './style.css'

export default function HFUI(props) {
  /* eslint-disable react/prop-types */
  const {
    GAPageview,
    authToken,
    getLastVersion,
    getSettings,
    getFavoritePairs,
    currentMode,
    currentPage,
  } = props

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

  return !authToken ? (
    <AuthenticationPage />
  ) : (
    <Switch>
      <Redirect exact from='/index.html' to='/' />
      <Route path='/' render={() => <TradingPage />} exact />
      <Route path='/strategy-editor' render={() => <StrategyEditorPage />} />
      <Route path='/data' render={() => <MarketDataPage />} />
      <Route path='/settings' render={() => <SettingsPage />} />
    </Switch>
  )
}
