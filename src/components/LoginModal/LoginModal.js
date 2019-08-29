import React from 'react'

import Modal from '../../ui/Modal'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import Checkbox from '../../ui/Checkbox'

import { propTypes, defaultProps } from './LoginModal.props'
import './style.css'

export default class LoginModal extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    username: '',
    password: '',
    remember: false,
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onRememberChange = this.onRememberChange.bind(this)
  }

  onUsernameChange(username) {
    this.setState(() => ({ username }))
  }

  onPasswordChange(password) {
    this.setState(() => ({ password }))
  }

  onRememberChange(remember) {
    this.setState(() => ({ remember }))
  }

  onSubmit() {
    const { onSubmit, onClose } = this.props
    const { username, password, remember } = this.state

    onSubmit({ username, password, remember })
    onClose()
  }

  render() {
    const { onClose, onRegister } = this.props
    const { username, password, remember } = this.state

    return (
      <Modal
        fixed
        className='hfui-loginmodal__wrapper'
        onClose={onClose}
      >
        <div className='hfui-loginmodal__header'>
          <h3>Login</h3>
          <p>Enter your credentials below</p>
        </div>

        <Input
          type='text'
          label='Username'
          value={username}
          onChange={this.onUsernameChange}
        />

        <Input
          type='password'
          label='Password'
          value={password}
          onChange={this.onPasswordChange}
        />

        <Checkbox
          label='Remember me'
          value={remember}
          onChange={this.onRememberChange}
        />

        <Button
          onClick={this.onSubmit}
          label='Submit'
          blue
        />

        <div className='hfui-loginmodal__footer'>
          <p>Don&#39;t have an account?</p>
          <button
            type='button'
            className='button'
            onClick={onRegister}
          >
            Join the waiting list.
          </button>
        </div>
      </Modal>
    )
  }
}
