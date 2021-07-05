import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import { Checkbox, Button, Intent } from '@ufx-ui/core'

import { getAuthToken } from '../../redux/selectors/ws'
import { getCurrentMode } from '../../redux/selectors/ui'
import { isDevEnv as devEnv } from '../../util/autologin'

// import NavbarButton from '../../Navbar/Navbar.Link'
import Input from '../../ui/Input'

const isDevEnv = devEnv()

const ApiKeys = ({ checked, onOptionChange }) => {
  const dispatch = useDispatch()
  // const settingsDms = useSelector(state => _get(state, 'settings.dms', null))
  // const settingsGa = useSelector(state => _get(state, 'settings.ga', null))
  // const authToken = useSelector(getAuthToken)
  // const currentMode = useSelector(getCurrentMode)

  // const [isDmsChecked, setIsDmsChecked] = useState(settingsDms)
  // const [isGaChecked, setIsGaChecked] = useState(settingsGa)

  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [paperApiKey, setPaperApiKey] = useState('')
  const [paperApiSecret, setPaperApiSecret] = useState('')

  // updateSettings: ({
  //   authToken, dms, ga,
  // }) => {
  //   dispatch(WSActions.send([
  //     'settings.update',
  //     authToken,
  //     dms,
  //     ga,
  //   ]))
  // },

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
      <Button intent={Intent.PRIMARY} small>
        Save
      </Button>
    </div>
  )
}

ApiKeys.propTypes = {
  checked: PropTypes.bool.isRequired,
  onOptionChange: PropTypes.func.isRequired,
}

export default memo(ApiKeys)
