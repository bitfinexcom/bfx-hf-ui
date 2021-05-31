import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'

import Input from '../../../../ui/Input'
import Button from '../../../../ui/Button'
import OrderFormModal from '../../OrderFormModal'

const SubmitAPIKeysModal = ({
  onClose, onSubmit, apiClientConnecting, isPaperTrading, isModal,
}) => {
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [error, setError] = useState('')

  const submitHandler = () => {
    if (_isEmpty(apiKey)) {
      setError('API Key Required')
    } else if (_isEmpty(apiSecret)) {
      setError('API Secret Required')
    } else {
      onSubmit({ apiKey, apiSecret })
      onClose()
    }
  }

  return (
    <OrderFormModal
      title={`SUBMIT ${isPaperTrading ? 'PAPER TRADING' : ''} API KEYS`}
      icon='icon-api'
      isModal={isModal}
      apiClientConnecting={apiClientConnecting}
      form={[
        <div key='form' className='row'>
          <Input type='text' placeholder='API KEY' value={apiKey} onChange={setApiKey} />
          <Input type='password' placeholder='API SECRET' value={apiSecret} onChange={setApiSecret} />
        </div>,
        error && (
          <div key='error' className='row'>
            <p className='error'>{error}</p>
          </div>
        ),
      ]}
      buttons={(
        <div className='row'>
          <Button onClick={submitHandler} label='Submit' green />
          <Button onClick={onClose} label='Cancel' red />
        </div>
      )}
    />
  )
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

export default memo(SubmitAPIKeysModal)
