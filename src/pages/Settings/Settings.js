import React, { useState } from 'react'
import PropTypes from 'prop-types'
import _size from 'lodash/size'
import _trim from 'lodash/trim'

import Button from '../../ui/Button'
import DeadMenSwitch from './DeadMenSwitch'
import Layout from '../../components/Layout'
import {
  getAutoLoginState,
  updateAutoLoginState,
} from '../../util/autologin'
import {
  PAPER_MODE,
  MAIN_MODE,
} from '../../redux/reducers/ui'

import './style.css'
import CheckboxesSections from './CheckboxesSections'
import APIKeysSection from './APIKeysSection'

const INITIAL_AUTO_LOGIN = getAutoLoginState()

const Settings = ({
  authToken,
  ga: propsGA,
  dms: propsDMS,
  updateSettings,
  gaUpdateSettings, getActiveAOs, submitAPIKeys, currentMode,
}) => {
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [paperApiKey, setPaperApiKey] = useState('')
  const [paperApiSecret, setPaperApiSecret] = useState('')
  const [autologin, setAutologin] = useState(INITIAL_AUTO_LOGIN)
  const [stateDMS, setStateDMS] = useState(null)
  const [stateGA, setStateGA] = useState(null)

  const onSubmitAPIKeys = () => {
    submitAPIKeys({
      authToken,
      apiKey,
      apiSecret,
    }, MAIN_MODE, currentMode)
  }

  const onSubmitPaperAPIKeys = () => {
    submitAPIKeys({
      authToken,
      apiKey: paperApiKey,
      apiSecret: paperApiSecret,
    }, PAPER_MODE, currentMode)
  }

  const onSettingsSave = () => {
    const ga = stateGA ?? propsGA
    const dms = stateDMS ?? propsDMS

    updateSettings({
      dms, authToken, ga,
    })
    getActiveAOs()
    gaUpdateSettings()
  }

  const onAPIKeysSave = () => {
    if (_size(_trim(apiKey)) && _size(_trim(apiSecret))) {
      onSubmitAPIKeys()
    }

    if (_size(_trim(paperApiKey)) && _size(_trim(paperApiSecret))) {
      onSubmitPaperAPIKeys()
    }
  }

  const _updateAutoLoginState = (state) => {
    setAutologin(state)
    updateAutoLoginState(state)
  }

  return (
    <Layout>
      <Layout.Header />
      <Layout.Main>
        <div className='hfui-settingspage__wrapper'>
          <h2 className='hfui-settings__title'>
            Settings
          </h2>
          <div className='hfui-settings__content'>
            <div className='hfui-settings__options'>
              <DeadMenSwitch
                onOptionChange={setStateDMS}
                checked={Boolean(stateDMS ?? propsDMS)}
              />

              <CheckboxesSections
                onOptionChange={setStateGA}
                gaChecked={Boolean(stateGA ?? propsGA)}
                autologinChecked={autologin}
                updateAutoLoginState={_updateAutoLoginState}
              />

              <div className='hfui-settings__option'>
                <Button
                  onClick={onSettingsSave}
                  label='Save'
                  className='settings-save'
                  green
                />
              </div>

              <APIKeysSection
                setApiKey={setApiKey}
                apiKey={apiKey}
                setApiSecret={setApiSecret}
                apiSecret={apiSecret}
                setPaperApiKey={setPaperApiKey}
                paperApiKey={paperApiKey}
                setPaperApiSecret={setPaperApiSecret}
                paperApiSecret={paperApiSecret}
              />

              <div className='hfui-settings__option'>
                <Button
                  onClick={onAPIKeysSave}
                  label='Update Keys'
                  className='settings-save'
                  green
                />
              </div>
            </div>
          </div>
        </div>
      </Layout.Main>
      <Layout.Footer />
    </Layout>
  )
}

Settings.propTypes = {
  ga: PropTypes.bool,
  dms: PropTypes.bool,
  authToken: PropTypes.string.isRequired,
  getActiveAOs: PropTypes.func.isRequired,
  submitAPIKeys: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired,
  gaUpdateSettings: PropTypes.func.isRequired,
  currentMode: PropTypes.string.isRequired,
}

Settings.defaultProps = {
  ga: null,
  dms: null,
}

export default Settings
