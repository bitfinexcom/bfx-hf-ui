import React from 'react'
import _isEmpty from 'lodash/isEmpty'

import Button from '../../ui/Button'
import Input from '../../ui/Input'
import { propTypes, defaultProps } from './AuthenticationInitForm.props'

const ENTER_KEY_CODE = 13

export default class AuthenticationInit extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    password: '',
    confirmPassword: '',
    error: '',
  }

  constructor(props) {
    super(props)

    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onPasswordChange(password) {
    this.setState(() => ({ password }))
  }

  onEnterPress({ keyCode }, submitReady) {
    if (submitReady && keyCode === ENTER_KEY_CODE) {
      this.onSubmit()
    }
  }

  onConfirmPasswordChange(confirmPassword) {
    this.setState(() => ({ confirmPassword }))
  }

  onSubmit() {
    const { password, confirmPassword } = this.state
    const { onInit } = this.props

    if (password !== confirmPassword) {
      this.setState(() => ({ error: 'Passwords do not match' }))
      return
    }

    this.setState(() => ({ error: '' }))
    onInit(password)
  }

  render() {
    const { password, confirmPassword, error } = this.state
    const submitReady = (
      (!_isEmpty(password) && !_isEmpty(confirmPassword))
      && (password === confirmPassword)
    )

    return (
      <div className='hfui-authenticationpage__content' onKeyDown={(e) => this.onEnterPress(e, submitReady)}>
        <h2>Honey Framework UI</h2>
        <p>Create a password to encrypt your API credentials &amp; strategies. All data is stored locally, and your password is hashed.</p>

        <form className='hfui-authenticationpage__inner-form'>
          <Input
            type='text'
            name='username'
            placeholder='Username'
            autocomplete='username'
            style={{ display: 'none' }}
          />

          <Input
            type='password'
            autocomplete='new-password'
            placeholder='Password'
            value={password}
            onChange={this.onPasswordChange}
          />

          <Input
            type='password'
            autocomplete='new-password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={this.onConfirmPasswordChange}
          />

          <Button
            onClick={this.onSubmit}
            disabled={!submitReady}
            label='Save Credentials'
            green
          />

          {error && (
            <p className='hfui-authenticationpage__inner-error'>
              {error}
            </p>
          )}
        </form>
      </div>
    )
  }
}
