import React from 'react'
import _isEmpty from 'lodash/isEmpty'

import Button from '../../ui/Button'
import Input from '../../ui/Input'
import Select from '../../ui/Select'

import { propTypes, defaultProps } from './AuthenticationUnlockForm.props'

const ENTER_KEY_CODE = 13

export default class AuthenticationInit extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    const { isPaperTrading } = this.props
    this.state = {
      password: '',
      mode: isPaperTrading ? 'paper' : 'main',
    }
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onUnlock = this.onUnlock.bind(this)
    this.onReset = this.onReset.bind(this)
    this.onEnterPress = this.onEnterPress.bind(this)
  }

  onPasswordChange(password) {
    this.setState(() => ({ password }))
  }

  onUnlock() {
    const { password, mode } = this.state
    const { onUnlock } = this.props
    onUnlock(password, mode)
  }

  onReset() {
    const { onReset } = this.props
    onReset()
  }

  onEnterPress({ keyCode }) {
    if (keyCode === ENTER_KEY_CODE) {
      const { password } = this.state
      this.onUnlock(password)
    }
  }

  selectMode(mode) {
    this.setState(() => ({ mode }))
  }

  render() {
    const { password, mode } = this.state
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

            <Select
              className='hfui-authenticationpage__trading-mode'
              placeholder='Select trading mode...'
              value={options.find(o => o.value === mode)}
              options={options}
              onChange={({ value }) => this.selectMode(value)}
            />
          </div>

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
