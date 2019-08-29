import React from 'react'
import { Route, Switch } from 'react-router'

import TradingPage from '../../pages/Trading'
import StrategyEditorPage from '../../pages/StrategyEditor'
import MarketDataPage from '../../pages/MarketData'

import Navbar from '../Navbar'
import LoginModal from '../LoginModal'
import RegisterModal from '../RegisterModal'
import ExchangeInfoBar from '../ExchangeInfoBar'
import NotificationsSidebar from '../NotificationsSidebar'

import { propTypes, defaultProps } from './HFUI.props'
import './style.css'

export default class HFUI extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    loginModalOpen: false,
    registerModalOpen: false,
  }

  constructor(props) {
    super(props)

    this.onChangeMarket = this.onChangeMarket.bind(this)
    this.onToggleLoginModal = this.onToggleLoginModal.bind(this)
    this.onToggleRegisterModal = this.onToggleRegisterModal.bind(this)
  }

  componentDidMount() {
    const { loginWithAuthToken } = this.props
    const cookies = document.cookie.split(';')

    cookies.forEach((c) => {
      const cookie = c.split('=')

      if (cookie[0].trim() === 'authToken') {
        loginWithAuthToken(cookie[1])
      }
    })
  }

  onChangeMarket(option) {
    const { saveActiveMarket } = this.props
    saveActiveMarket(option.value)
  }

  onToggleLoginModal() {
    this.setState(({ loginModalOpen }) => ({
      loginModalOpen: !loginModalOpen,
      registerModalOpen: false,
    }))
  }

  onToggleRegisterModal() {
    this.setState(({ registerModalOpen }) => ({
      registerModalOpen: !registerModalOpen,
      loginModalOpen: false,
    }))
  }

  render() {
    const { loginModalOpen, registerModalOpen } = this.state
    const { activeMarket } = this.props

    return (
      <div className='hfui-app'>
        <Navbar
          onLogin={this.onToggleLoginModal}
          onRegister={this.onToggleRegisterModal}
        />

        <ExchangeInfoBar
          selectedMarket={activeMarket}
          onChangeMarket={this.onChangeMarket}
        />

        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <TradingPage
                onRegister={this.onToggleRegisterModal}
                onLogin={this.onToggleLoginModal}
              />
            )}
          />

          <Route
            path='/strategy-editor'
            render={() => (
              <StrategyEditorPage onLogin={this.onToggleLoginModal} />
            )}
          />

          <Route
            path='/data'
            render={() => (
              <MarketDataPage
                onRegister={this.onToggleRegisterModal}
                onLogin={this.onToggleLoginModal}
              />
            )}
          />
        </Switch>

        <NotificationsSidebar />

        {loginModalOpen && (
          <LoginModal
            onClose={this.onToggleLoginModal}
            onRegister={this.onToggleRegisterModal}
          />
        )}

        {registerModalOpen && (
          <RegisterModal
            onClose={this.onToggleRegisterModal}
            onLogin={this.onToggleLoginModal}
          />
        )}
      </div>
    )
  }
}
