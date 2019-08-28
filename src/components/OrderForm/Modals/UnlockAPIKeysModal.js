import React from 'react'
import _isEmpty from 'lodash/isEmpty'

import Input from '../../../ui/Input'
import Button from '../../../ui/Button'
import OrderFormModal from '../OrderFormModal'

export default class UnlockAPIKeysModal extends React.Component {
  state = {
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
    const { password, confirmPassword } = this.state
    const { onSubmit, onClose } = this.props

    if (_isEmpty(password)) {
      return this.setState(() => ({ error: 'Password Required' }))
    } else if (password !== confirmPassword) {
      return this.setState(() => ({ error: 'Passwords don\'t match' }))
    }

    onSubmit({ password })
    onClose()
  }

  render () {
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
            onChange={this.onFieldChange.bind(this, 'password')}
          />,

          <Input
            type='password'
            label='Confirm Password'
            key='confirmPassword'
            value={confirmPassword}
            onChange={this.onFieldChange.bind(this, 'confirmPassword')}
          />,

          error && (
            <p key='error' className='error'>{error}</p>
          )
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
          />
        ]}
      />
    )
  }
}
