import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _size from 'lodash/size'
import _trim from 'lodash/trim'
import { Button, Intent } from '@ufx-ui/core'

import { getAuthToken } from '../../redux/selectors/ws'
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

  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [paperApiKey, setPaperApiKey] = useState('')
  const [paperApiSecret, setPaperApiSecret] = useState('')

  const isProductionKeysTouched = _size(_trim(apiKey)) && _size(_trim(apiSecret))
  const isPaperKeysTouched = _size(_trim(paperApiKey)) && _size(_trim(paperApiSecret))

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
        Api Keys
      </div>
      <div className='appsettings-modal__setting'>
        <p>Production API Keys</p>
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
        <p>Paper Trading API Keys</p>
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
        Save
      </Button>
    </div>
  )
}

export default ApiKeys
