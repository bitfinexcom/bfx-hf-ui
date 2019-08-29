import React from 'react'
import _isEmpty from 'lodash/isEmpty'

import Input from '../../ui/Input'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import { propTypes, defaultProps } from './StrategyPasswordModal.props'
import './style.css'

export default class StrategyPasswordModal extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    password: '',
    error: '',
  }

  constructor(props) {
    super(props)

    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onPasswordChange(password) {
    this.setState(() => ({ password }))
  }

  onSubmit() {
    const { onSubmit } = this.props
    const { password } = this.state

    if (_isEmpty(password)) {
      this.setState(() => ({ error: 'Password empty' }))
    } else {
      onSubmit(password)
    }
  }

  render() {
    const { onClose } = this.props
    const { error, password } = this.state

    return (
      <Modal
        onClose={onClose}
        className='hfui-strategypasswordmodal__wrapper'
      >
        <p>Enter Password</p>
        <p className='notice'>Your strategies are encrypted before being sent to the server. This password is required in order to view, save or execute your strategy.</p>

        <Input
          type='password'
          label='Strategy Password'
          value={password}
          onChange={this.onPasswordChange}
        />

        <Button
          label='Submit'
          onClick={this.onSubmit}
        />

        {error && (
          <p className='error'>{error}</p>
        )}
      </Modal>
    )
  }
}
