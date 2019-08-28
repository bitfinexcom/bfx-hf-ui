import React from 'react'
import { Route, Switch } from 'react-router'

import TradingPage from '../../pages/Trading'
import AccountPage from '../../pages/Account'
import StrategyEditorPage from '../../pages/StrategyEditor'
import MarketDataPage from '../../pages/MarketData'

import Navbar from '../Navbar'
import LoginModal from '../LoginModal'
import RegisterModal from '../RegisterModal'
import UpgradeModal from '../UpgradeModal'
import ExchangeInfoBar from '../ExchangeInfoBar'
import NotificationsSidebar from '../NotificationsSidebar'

import './style.css'

export default class DTC extends React.Component {
  state = {
    loginModalOpen: false,
    registerModalOpen: false,
    upgradeModalOpen: false,
  }

  constructor (props) {
    super(props)

    this.onChangeMarket = this.onChangeMarket.bind(this)
    this.onToggleLoginModal = this.onToggleLoginModal.bind(this)
    this.onToggleRegisterModal = this.onToggleRegisterModal.bind(this)
    this.onToggleUpgradeModal = this.onToggleUpgradeModal.bind(this)
    this.onUpgrade = this.onUpgrade.bind(this)
  }

  componentDidMount () {
    const { loginWithAuthToken } = this.props
    const cookies = document.cookie.split(';')

    cookies.forEach(c => {
      const cookie = c.split('=')

      if (cookie[0].trim() === 'authToken') {
        loginWithAuthToken(cookie[1])
      }
    })
  }

  onChangeMarket (option) {
    const { saveActiveMarket } = this.props
    saveActiveMarket(option.value)
  }

  onUpgrade () {
    const { navigate } = this.props

    this.setState(() => ({ upgradeModalOpen: false }))

    navigate('/pricing')
  }

  onToggleLoginModal () {
    this.setState(({ loginModalOpen }) => ({
      loginModalOpen: !loginModalOpen,
      registerModalOpen: false,
      upgradeModalOpen: false,
    }))
  }

  onToggleRegisterModal () {
    this.setState(({ registerModalOpen }) => ({
      registerModalOpen: !registerModalOpen,
      loginModalOpen: false,
      upgradeModalOpen: false,
    }))
  }

  onToggleUpgradeModal () {
    this.setState(({ upgradeModalOpen }) => ({
      upgradeModalOpen: !upgradeModalOpen,
      loginModalOpen: false,
      registerModalOpen: false,
    }))
  }

  render () {
    const { loginModalOpen, registerModalOpen, upgradeModalOpen } = this.state
    const { activeMarket } = this.props

    return (
      <div className='dtc-app'>
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
                onUpgrade={this.onToggleUpgradeModal}
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
            path='/account'
            render={() => (
              <AccountPage />
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

        {upgradeModalOpen && (
          <UpgradeModal
            onClose={this.onToggleUpgradeModal}
            onUpgrade={this.onUpgrade}
          />
        )}
      </div>
    )
  }
}
