import React from 'react'
import _isEmpty from 'lodash/isEmpty'

import Input from '../../../../ui/Input'
import Button from '../../../../ui/Button'
import OrderFormModal from '../../OrderFormModal'
import { propTypes, defaultProps } from './UnlockAPIKeysModal.props'

export default class UnlockAPIKeysModal extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    password: '',
    confirmPassword: '',
    error: '',
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this)
  }

  onPasswordChange(password) {
    this.setState(() => ({ password }))
  }

  onConfirmPasswordChange(confirmPassword) {
    this.setState(() => ({ confirmPassword }))
  }

  onSubmit() {
    const { password, confirmPassword } = this.state
    const { onSubmit, onClose } = this.props

    if (_isEmpty(password)) {
      this.setState(() => ({ error: 'Password Required' }))
    } if (password !== confirmPassword) {
      this.setState(() => ({ error: 'Passwords don\'t match' }))
    } else {
      onSubmit({ password })
      onClose()
    }
  }

  render() {
    const { password, confirmPassword, error } = this.state
    const { onClose } = this.props

    return (
      <OrderFormModal
        className='nohover'
        title='UNLOCK'
        icon='fas fa-unlock'
        form={[
          <Input
            type='password'
            label='Password'
            key='password'
            value={password}
            onChange={this.onPasswordChange}
          />,

          <Input
            type='password'
            label='Confirm Password'
            key='confirmPassword'
            value={confirmPassword}
            onChange={this.onConfirmPasswordChange}
          />,

          error && (
            <p key='error' className='error'>{error}</p>
          ),
        ]}

        buttons={[
          <Button
            onClick={onClose}
            label='Cancel'
            key='cancel'
            red
          />,

          <Button
            onClick={this.onSubmit}
            label='Unlock'
            key='unlock'
            green
          />,
        ]}
      />
    )
  }
}
