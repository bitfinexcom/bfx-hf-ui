import React from 'react'

import Modal from '../../ui/Modal'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import Checkbox from '../../ui/Checkbox'

import './style.css'

export default class LoginModal extends React.Component {
  state = {
    username: '',
    password: '',
    remember: false,
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
    const { username, password, remember } = this.state

    onSubmit({ username, password, remember })
    onClose()
  }

  render () {
    const { onClose, onRegister } = this.props
    const { username, password, remember } = this.state

    return (
      <Modal
        fixed
        className='dtc-loginmodal__wrapper'
        onClose={onClose}
      >
        <div className='dtc-loginmodal__header'>
          <h3>Login</h3>
          <p>Enter your credentials below</p>
        </div>

        <Input
          type='text'
          label='Username'
          value={username}
          onChange={this.onFieldChange.bind(this, 'username')}
        />

        <Input
          type='password'
          label='Password'
          value={password}
          onChange={this.onFieldChange.bind(this, 'password')}
        />

        <Checkbox 
          label='Remember me'
          value={remember}
          onChange={this.onFieldChange.bind(this, 'remember')}
        />

        <Button
          onClick={this.onSubmit}
          label='Submit'
          blue
        />

        <div className='dtc-loginmodal__footer'>
          <p>Don't have an account?</p>
          <p
            className='button'
            onClick={onRegister}
          >Join the waiting list.</p>
        </div>
      </Modal>
    )
  }
}
