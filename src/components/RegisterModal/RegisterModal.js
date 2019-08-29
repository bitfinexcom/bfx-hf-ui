import React from 'react'
import EmailValidator from 'email-validator'
import _isEmpty from 'lodash/isEmpty'

import Modal from '../../ui/Modal'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import { propTypes, defaultProps } from './RegisterModal.props'
import './style.css'

export default class RegisterModal extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    error: '',
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this)
  }

  onEmailChange(email) {
    this.setState(() => ({ email }))
  }

  onUsernameChange(username) {
    this.setState(() => ({ username }))
  }

  onPasswordChange(password) {
    this.setState(() => ({ password }))
  }

  onConfirmPasswordChange(confirmPassword) {
    this.setState(() => ({ confirmPassword }))
  }

  onSubmit() {
    const { onSubmit, onClose } = this.props
    const {
      username, password, confirmPassword, email,
    } = this.state

    if (_isEmpty(username)) {
      this.setState(() => ({ error: 'Username required ' }))
    } if (_isEmpty(password)) {
      this.setState(() => ({ error: 'Password required ' }))
    } if (password !== confirmPassword) {
      this.setState(() => ({ error: 'Passwords don\'t match ' }))
    } if (_isEmpty(email)) {
      this.setState(() => ({ error: 'E-Mail required' }))
    } if (!EmailValidator.validate(email)) {
      this.setState(() => ({ error: 'Invalid e-mail' }))
    } else {
      onSubmit({ username, password, email })
      onClose()
    }
  }

  render() {
    const { onClose, onLogin } = this.props
    const {
      username, password, confirmPassword, email, error,
    } = this.state

    return (
      <Modal
        fixed
        className='dtc-registermodal__wrapper'
        onClose={onClose}
      >
        <div className='dtc-registermodal__header'>
          <h3>Register</h3>
          <p>Enter your account details below</p>
        </div>

        <Input
          type='text'
          value={username}
          label='Username'
          onChange={this.onUsernameChange}
        />

        <Input
          type='password'
          label='Password'
          value={password}
          onChange={this.onPasswordChange}
        />

        <Input
          type='password'
          label='Confirm Password'
          value={confirmPassword}
          onChange={this.onConfirmPasswordChange}
        />

        <Input
          type='email'
          label='E-Mail'
          value={email}
          onChange={this.onEmailChange}
        />

        <Button
          onClick={this.onSubmit}
          label='Submit'
          blue
        />

        {!_isEmpty(error) && (
          <p className='error'>{error}</p>
        )}

        <div className='dtc-registermodal__footer'>
          <p>Already have an account?</p>
          <button
            type='button'
            className='button'
            onClick={onLogin}
          >
            Login now.
          </button>
        </div>
      </Modal>
    )
  }
}
