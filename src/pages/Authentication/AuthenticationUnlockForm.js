import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@ufx-ui/core'
import _isEmpty from 'lodash/isEmpty'

import Input from '../../ui/Input'
import Button from '../../ui/Button'
import Dropdown from '../../ui/Dropdown'
import {
  getStoredPassword,
  getAutoLoginState,
  isDevEnv as devEnv,
  updateAutoLoginState,
  updateStoredPassword,
} from '../../util/autologin'

const isDevEnv = devEnv()
const ENTER_KEY_CODE = 13
export default class AuthenticationInit extends React.PureComponent {
  static propTypes = {
    onUnlock: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    isPaperTrading: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
    const { isPaperTrading } = this.props
    this.state = {
      password: '',
      AUTOLOGIN_STATE: getAutoLoginState(),
      mode: isPaperTrading ? 'paper' : 'main',
    }
  }

  componentDidMount() {
    const { AUTOLOGIN_STATE } = this.state
    const pass = getStoredPassword()
    if (isDevEnv && pass && AUTOLOGIN_STATE) {
      this.setState(() => ({
        password: pass,
      }), () => {
        this.onUnlock()
      })
    }
  }

  onPasswordChange = (password) => {
    this.setState(() => ({ password }))
  }

  onUnlock = () => {
    const { mode, password, AUTOLOGIN_STATE } = this.state
    const { onUnlock } = this.props
    if (isDevEnv && password.length) {
      updateStoredPassword(password)
      updateAutoLoginState(AUTOLOGIN_STATE)
    }

    onUnlock(password, mode)
  }

  onReset = () => {
    const { onReset } = this.props
    onReset()
  }

  onEnterPress = (event = {}) => {
    const { keyCode } = event
    if (keyCode === ENTER_KEY_CODE) {
      this.onUnlock()
    }
  }

  updateAutoLoginState = (state) => {
    this.setState(() => ({
      AUTOLOGIN_STATE: state,
    }))
  }

  selectMode = (mode) => {
    this.setState(() => ({ mode }))
  }

  render() {
    const { mode, password, AUTOLOGIN_STATE } = this.state
    const submitReady = !_isEmpty(password) && !_isEmpty(mode)
    const options = [{ value: 'main', label: 'Production' }, { value: 'paper', label: 'Paper Trading' }]

    return (
      <div className='hfui-authenticationpage__content' onKeyDown={this.onEnterPress}>
        <h2>Honey Framework UI</h2>
        <p>Enter your password to unlock.</p>

        <form className='hfui-authenticationpage__inner-form'>
          <Input
            type='text'
            name='username'
            autocomplete='username'
            style={{ display: 'none' }}
          />

          <Input
            type='password'
            autocomplete='current-password'
            placeholder='Password'
            value={password}
            onChange={this.onPasswordChange}
          />
          <div className='hfui-authenticationpage__mode-select'>
            <p>Select trading mode</p>

            <Dropdown
              className='hfui-authenticationpage__trading-mode'
              placeholder='Select trading mode...'
              value={options.find(o => o.value === mode).value}
              options={options}
              onChange={(value) => this.selectMode(value)}
            />
          </div>
          {isDevEnv && (
          <div className='hfui-authenticationpage__dev-mode'>
            <Checkbox
              label='Auto-login in development mode'
              checked={AUTOLOGIN_STATE}
              onChange={this.updateAutoLoginState}
            />
          </div>
          )}
          <Button
            onClick={this.onUnlock}
            disabled={!submitReady}
            label='Unlock'
            green
          />
        </form>

        <div className='hfui-authenticationpage__clear'>
          <p>Alternatively, clear your credentials &amp; and stored data to set a new password.</p>

          <Button
            onClick={this.onReset}
            label='Clear Data &amp; Reset'
            red
          />
        </div>
      </div>
    )
  }
}
