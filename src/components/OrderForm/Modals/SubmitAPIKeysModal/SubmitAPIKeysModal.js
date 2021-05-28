import React from 'react'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'

import Input from '../../../../ui/Input'
import Button from '../../../../ui/Button'
import OrderFormModal from '../../OrderFormModal'

class SubmitAPIKeysModal extends React.Component {
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
    const {
      onClose, apiClientConnecting, isPaperTrading, isModal,
    } = this.props
    const { apiKey, apiSecret, error } = this.state

    return (
      <OrderFormModal
        title={`SUBMIT ${isPaperTrading ? 'PAPER TRADING' : ''} API KEYS`}
        icon='icon-api'
        isModal={isModal}
        apiClientConnecting={apiClientConnecting}
        form={[
          <div key='form' className='row'>
            <Input
              type='text'
              placeholder='API KEY'
              key='apiKey'
              value={apiKey}
              onChange={this.onAPIKeyChange}
            />

            <Input
              type='password'
              placeholder='API SECRET'
              key='apiSecret'
              value={apiSecret}
              onChange={this.onAPISecretChange}
            />
          </div>,

          error && (
            <div key='error' className='row'>
              <p className='error'>{error}</p>
            </div>
          ),
        ]}
        buttons={(
          <div className='row'>
            <Button
              onClick={this.onSubmit}
              label='Submit'
              key='submit'
              green
            />

            <Button
              onClick={onClose}
              label='Cancel'
              key='cancel'
              red
            />
          </div>
        )}
      />
    )
  }
}

SubmitAPIKeysModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isPaperTrading: PropTypes.bool.isRequired,
  apiClientConnecting: PropTypes.bool,
  isModal: PropTypes.bool,
}

SubmitAPIKeysModal.defaultProps = {
  isModal: true,
  apiClientConnecting: false,
}

export default SubmitAPIKeysModal
