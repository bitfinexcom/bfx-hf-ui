import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router'

import SettingsPage from '../../pages/Settings'
import TradingPage from '../../pages/Trading'
import StrategyEditorPage from '../../pages/StrategyEditor'
import MarketDataPage from '../../pages/MarketData'
import AuthenticationPage from '../../pages/Authentication'

import Layout from '../Layout'
import Navbar from '../Navbar'
import NotificationsSidebar from '../NotificationsSidebar'

import './style.css'

export default function HFUI(props) {
  /* eslint-disable react/prop-types */
  const {
    GAPageview,
    authToken,
    getLastVersion,
    getSettings,
    notificationsVisible,
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

  return (
    <Layout authToken={authToken}>
      {!authToken ? (
        <AuthenticationPage />
      ) : (
        <Switch>
          <Redirect exact from='/index.html' to='/' />
          <Route path='/' render={() => <TradingPage />} exact />
          <Route path='/strategy-editor' render={() => <StrategyEditorPage />} />
          <Route path='/data' render={() => <MarketDataPage />} />
          <Route path='/settings' render={() => <SettingsPage />} />
        </Switch>
      )}
    </Layout>
  )
}

// return (
//   // <div className='hfui-app'>
//   //   <header>
//   //     <Navbar />
//   //     {/* <ExchangeInfoBar
//   //       showSave
//   //       showAddComponent
//   //       onSave={() => this.grid.onSaveLayout()}
//   //       onAddComponent={() => this.grid.onToggleAddComponentModal()}
//   //     /> */}
//   //   </header>

//   //   <main className='hfui-main'>

//   //   </main>

//   //   <footer>
//   //     {/* <StatusBar /> */}
//   //   </footer>

//   //   {/* {showAlgoModal && hasActiveAlgoOrders && apiClientConnected
//   //       && <ActiveAlgoOrdersModal />}
//   //   <TradingModeModal />
//   //   <BadConnectionModal /> */}
//   //   {/* <NotificationsSidebar notificationsVisible={notificationsVisible} /> */}
//   // </div>
// )
