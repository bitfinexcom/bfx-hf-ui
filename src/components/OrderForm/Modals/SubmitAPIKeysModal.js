import React from 'react'
import _isEmpty from 'lodash/isEmpty'

import Input from '../../../ui/Input'
import Button from '../../../ui/Button'
import OrderFormModal from '../OrderFormModal'

export default class SubmitAPIKeysModal extends React.Component {
  state = {
    apiKey: '',
    apiSecret: '',
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
    const { apiKey, apiSecret, password, confirmPassword } = this.state
    const { onSubmit, onClose } = this.props

    if (_isEmpty(apiKey)) {
      return this.setState(() => ({ error: 'API Key Required' }))
    } else if (_isEmpty(apiSecret)) {
      return this.setState(() => ({ error: 'API Secret Required' }))
    } else if (_isEmpty(password)) {
      return this.setState(() => ({ error: 'Password Required' }))
    } else if (password !== confirmPassword) {
      return this.setState(() => ({ error: 'Passwords don\'t match' }))
    }

    onSubmit({ apiKey, apiSecret, password })
    onClose()
  }

  render () {
    const { apiKey, apiSecret, password, confirmPassword, error } = this.state
    const { exID, onClose } = this.props

    return (
      <OrderFormModal
        className='nohover'
        title={`SUBMIT API KEYS FOR ${exID.toUpperCase()}`}
        icon='fas fa-cogs'
        form={[
          <Input
            type='text'
            label='API Key'
            key='apiKey'
            value={apiKey}
            onChange={this.onFieldChange.bind(this, 'apiKey')}
          />,

          <Input
            type='password'
            label='API Secret'
            key='apiSecret'
            value={apiSecret}
            onChange={this.onFieldChange.bind(this, 'apiSecret')}
          />,

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
            <p className='error'>{error}</p>
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
            label='Submit'
            key='submit'
            green
          />
        ]}
      />
    )
  }
}
