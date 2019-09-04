import React from 'react'
import _isEmpty from 'lodash/isEmpty'

import Input from '../../../../ui/Input'
import Button from '../../../../ui/Button'
import OrderFormModal from '../../OrderFormModal'
import { propTypes, defaultProps } from './SubmitAPIKeysModal.props'

export default class SubmitAPIKeysModal extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    apiKey: '',
    apiSecret: '',
    error: '',
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.onAPIKeyChange = this.onAPIKeyChange.bind(this)
    this.onAPISecretChange = this.onAPISecretChange.bind(this)
  }

  onAPIKeyChange(apiKey) {
    this.setState(() => ({ apiKey }))
  }

  onAPISecretChange(apiSecret) {
    this.setState(() => ({ apiSecret }))
  }

  onSubmit() {
    const { onSubmit, onClose } = this.props
    const { apiKey, apiSecret } = this.state

    if (_isEmpty(apiKey)) {
      this.setState(() => ({ error: 'API Key Required' }))
    } if (_isEmpty(apiSecret)) {
      this.setState(() => ({ error: 'API Secret Required' }))
    } else {
      onSubmit({ apiKey, apiSecret })
      onClose()
    }
  }

  render() {
    const { exID, onClose } = this.props
    const { apiKey, apiSecret, error } = this.state

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
            onChange={this.onAPIKeyChange}
          />,

          <Input
            type='password'
            label='API Secret'
            key='apiSecret'
            value={apiSecret}
            onChange={this.onAPISecretChange}
          />,

          error && (
            <p className='error'>{error}</p>
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
            label='Submit'
            key='submit'
            green
          />,
        ]}
      />
    )
  }
}
