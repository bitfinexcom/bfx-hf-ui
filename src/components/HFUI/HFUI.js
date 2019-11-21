import React from 'react'
import { Route, Switch, Redirect } from 'react-router'

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

  onChangeMarket(option) {
    const { saveActiveMarket } = this.props
    saveActiveMarket(option.value)
  }

  render() {
    const { activeMarket, authToken, getLastVersion } = this.props
    const oneHour = 360000
    getLastVersion()
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

        <ExchangeInfoBar
          selectedMarket={activeMarket}
          onChangeMarket={this.onChangeMarket}
        />

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
        </Switch>

        <NotificationsSidebar />
      </div>
    )
  }
}
