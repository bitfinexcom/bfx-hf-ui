import React from 'react'
import { Route, Switch, Redirect } from 'react-router'

import SettingsPage from '../../pages/Settings'
import TradingPage from '../../pages/Trading'
import StrategyEditorPage from '../../pages/StrategyEditor'
import MarketDataPage from '../../pages/MarketData'
import AuthenticationPage from '../../pages/Authentication'

import Navbar from '../Navbar'
import ExchangeInfoBar from '../ExchangeInfoBar'
import NotificationsSidebar from '../NotificationsSidebar'

import { propTypes, defaultProps } from './HFUI.props'
import './style.css'

export default class HFUI extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    this.onChangeMarket = this.onChangeMarket.bind(this)
  }

  componentDidUpdate() {
    const { ReactGA } = this.props
    ReactGA.pageview(window.location.pathname).send()
  }

  onChangeMarket({ value }) {
    const { saveActiveMarket } = this.props
    saveActiveMarket(value)
  }

  render() {
    const {
      activeMarket, authToken, getLastVersion, currentPage, getSettings, notificationsVisible,
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
        {
          currentPage !== '/settings' && (
            <ExchangeInfoBar
              selectedMarket={activeMarket}
              onChangeMarket={this.onChangeMarket}
            />
          )
        }

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
