import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _size from 'lodash/size'
import _trim from 'lodash/trim'
import _isEmpty from 'lodash/isEmpty'
import { Button, Intent } from '@ufx-ui/core'

import { ReactComponent as CheckIcon } from './check.svg'
import { ReactComponent as ErrorIcon } from './error.svg'

import { getAuthToken, getAPIClientState, getAPICredentials } from '../../redux/selectors/ws'
import { getCurrentMode } from '../../redux/selectors/ui'
import WSActions from '../../redux/actions/ws'
import Input from '../../ui/Input'
import {
  PAPER_MODE,
  MAIN_MODE,
} from '../../redux/reducers/ui'

const ApiKeys = () => {
  const dispatch = useDispatch()
  const authToken = useSelector(getAuthToken)
  const currentMode = useSelector(getCurrentMode)
  const apiClientState = useSelector(getAPIClientState)
  const apiCredentials = useSelector(getAPICredentials)

  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [paperApiKey, setPaperApiKey] = useState('')
  const [paperApiSecret, setPaperApiSecret] = useState('')

  const isProductionKeysTouched = _size(_trim(apiKey)) && _size(_trim(apiSecret))
  const isPaperKeysTouched = _size(_trim(paperApiKey)) && _size(_trim(paperApiSecret))

  const apiClientConnected = apiClientState === 2
  const apiClientConfigured = !_isEmpty(apiCredentials)
  const isNotConfigured = !apiClientConnected && !apiClientConfigured

  const onSave = () => {
    if (isProductionKeysTouched) {
      dispatch(WSActions.send([
        'api_credentials.save',
        authToken,
        apiKey,
        apiSecret,
        MAIN_MODE,
        currentMode,
      ]))
    }

    if (isPaperKeysTouched) {
      dispatch(WSActions.send([
        'api_credentials.save',
        authToken,
        paperApiKey,
        paperApiSecret,
        PAPER_MODE,
        currentMode,
      ]))
    }
  }

  return (
    <div>
      <div className='appsettings-modal__title'>
        API Keys
      </div>
      {isNotConfigured ? (
        <div className='appsettings-modal__api-configuration-message is-error'>
          <ErrorIcon />
          {' '}
          Not Configured
        </div>
      ) : (
        <div className='appsettings-modal__api-configuration-message is-success'>
          <CheckIcon />
          {' '}
          Configured
        </div>
      )}
      <div className='appsettings-modal__setting'>
        <p>
          Production API Keys -
          {' '}
          <a
            href='https://support.bitfinex.com/hc/en-us/articles/115002349625-API-Key-Setup-Login'
            target='_blank'
            rel='noopener noreferrer'
          >
            How to Create a Key?
          </a>
        </p>
        <div className='appsettings-modal__input'>
          <Input
            type='text'
            placeholder='API Key'
            onChange={setApiKey}
            value={apiKey}
            autocomplete='off'
          />
        </div>
        <div className='appsettings-modal__input'>
          <Input
            type='password'
            placeholder='API Secret'
            onChange={setApiSecret}
            value={apiSecret}
            autocomplete='off'
          />
        </div>
      </div>
      <div className='appsettings-modal__setting'>
        <p>
          Paper Trading API Keys -
          {' '}
          <a
            href='https://support.bitfinex.com/hc/en-us/articles/900001525006-Paper-Trading-test-learn-and-simulate-trading-strategies-'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn More
          </a>
        </p>
        <div className='appsettings-modal__input'>
          <Input
            type='text'
            placeholder='Paper Trading API Key'
            onChange={setPaperApiKey}
            value={paperApiKey}
            autocomplete='off'
          />
        </div>
        <div className='appsettings-modal__input'>
          <Input
            type='password'
            placeholder='Paper Trading API Secret'
            onChange={setPaperApiSecret}
            value={paperApiSecret}
            autocomplete='off'
          />
        </div>
      </div>
      <Button
        intent={Intent.PRIMARY}
        small
        onClick={onSave}
        disabled={!(isProductionKeysTouched || isPaperKeysTouched)}
      >
        {isNotConfigured ? 'Save' : 'Update'}
      </Button>
    </div>
  )
}

export default ApiKeys
