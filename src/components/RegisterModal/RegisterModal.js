import React from 'react'
import EmailValidator from 'email-validator'
import _isEmpty from 'lodash/isEmpty'

import Modal from '../../ui/Modal'
import Input from '../../ui/Input'
import Button from '../../ui/Button'

import './style.css'

export default class RegisterModal extends React.Component {
  state = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    error: '',
  }

  constructor (props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onFieldChange (field, value) {
    this.setState(() => ({ [field]: value }))
  }

  onSubmit () {
    const { onSubmit, onClose } = this.props
    const { username, password, confirmPassword, email } = this.state

    if (_isEmpty(username)) {
      return this.setState(() => ({ error: 'Username required '}))
    } else if (_isEmpty(password)) {
      return this.setState(() => ({ error: 'Password required '}))
    } else if (password !== confirmPassword) {
      return this.setState(() => ({ error: 'Passwords don\'t match '}))
    } else if (_isEmpty(email)) {
      return this.setState(() => ({ error: 'E-Mail required'}))
    } else if (!EmailValidator.validate(email)) {
      return this.setState(() => ({ error: 'Invalid e-mail'}))
    }

    onSubmit({ username, password, email })
    onClose()
  }

  render () {
    const { onClose, onLogin } = this.props
    const { username, password, confirmPassword, email, error } = this.state

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
          onChange={this.onFieldChange.bind(this, 'username')}
        />

        <Input
          type='password'
          label='Password'
          value={password}
          onChange={this.onFieldChange.bind(this, 'password')}
        />

        <Input
          type='password'
          label='Confirm Password'
          value={confirmPassword}
          onChange={this.onFieldChange.bind(this, 'confirmPassword')}
        />

        <Input
          type='email'
          label='E-Mail'
          value={email}
          onChange={this.onFieldChange.bind(this, 'email')}
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
          <p
            className='button'
            onClick={onLogin}
          >Login now.</p>
        </div>
      </Modal>
    )
  }
}
