import React from 'react'
import { Route, Switch, Redirect } from 'react-router'

import SettingsPage from '../../pages/Settings'
import TradingPage from '../../pages/Trading'
import StrategyEditorPage from '../../pages/StrategyEditor'
import MarketDataPage from '../../pages/MarketData'
import AuthenticationPage from '../../pages/Authentication'

import Navbar from '../Navbar'
import NotificationsSidebar from '../NotificationsSidebar'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'

import { propTypes, defaultProps } from './HFUI.props'
import './style.css'

export default class HFUI extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  state = {
    tosModalOpened: true,
  }
  componentDidUpdate() {
    const { GAPageview } = this.props
    GAPageview(window.location.pathname)
  }
  onSubmit() {
    const { terms } = this.props
    window.localStorage.setItem('tos', terms)
    this.onModalClose()
  }
  onModalClose() {
    const { tosModalOpened } = this.state
    this.setState(() => ({
      tosModalOpened: !tosModalOpened,
    }))
  }
  render() {
    const {
      authToken, getLastVersion, getSettings, notificationsVisible,
      getLastTOS, terms,
    } = this.props
    const { tosModalOpened } = this.state
    const tos = window.localStorage.getItem('tos') || ''
    const oneHour = 360000
    getLastVersion()
    getLastTOS()
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
          {tosModalOpened && (!tos.length || tos !== terms)
          && (
          <Modal
            onClose={() => this.onModalClose()}
            className='tos'
            label='terms of usage'
            actions={(
              <Button
                green
                onClick={() => this.onSubmit()}
                label={[
                  <p key='text'>Submit</p>,
                ]}
              />
            )}
          >
            <div className='tos-content'>
              {terms}
            </div>
          </Modal>
          )}
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
