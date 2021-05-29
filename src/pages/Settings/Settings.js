import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@ufx-ui/core'
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
import NavbarButton from '../../components/NavbarButton'

import './style.css'
import CheckboxesSections from './CheckboxesSections'
import APIKeysSection from './APIKeysSection'

class Settings extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      apiKey: '',
      apiSecret: '',
      paperApiKey: '',
      paperApiSecret: '',
      AUTOLOGIN_STATE: getAutoLoginState(),
    }
  }

  onOptionChange(value, identifier) {
    this.setState(() => ({
      [identifier]: value,
    }))
  }

  onSubmitAPIKeys({ apiKey, apiSecret }) {
    const {
      submitAPIKeys,
      authToken,
      currentMode,
    } = this.props

    submitAPIKeys({
      authToken,
      apiKey,
      apiSecret,
    }, MAIN_MODE, currentMode)
  }

  onSubmitPaperAPIKeys({ paperApiKey: apiKey, paperApiSecret: apiSecret }) {
    const {
      submitAPIKeys,
      authToken,
      currentMode,
    } = this.props

    submitAPIKeys({
      authToken,
      apiKey,
      apiSecret,
    }, PAPER_MODE, currentMode)
  }

  onSettingsSave(authToken) {
    const {
      ga: propsGA,
      getActiveAOs,
      dms: propsDMS,
      updateSettings,
      gaUpdateSettings,
    } = this.props
    const {
      // apiKey,
      // apiSecret,
      // paperApiKey,
      // paperApiSecret,
      ga: stateGA,
      dms: stateDMS,
    } = this.state
    const ga = stateGA ?? propsGA
    const dms = stateDMS ?? propsDMS

    // if (_size(_trim(apiKey)) && _size(_trim(apiSecret))) {
    //   this.onSubmitAPIKeys(this.state)
    // }

    // if (_size(_trim(paperApiKey)) && _size(_trim(paperApiSecret))) {
    //   this.onSubmitPaperAPIKeys(this.state)
    // }

    updateSettings({
      dms, authToken, ga,
    })
    getActiveAOs()
    gaUpdateSettings()
  }

  updateAutoLoginState(state) {
    this.setState(() => ({
      AUTOLOGIN_STATE: state,
    }))
    updateAutoLoginState(state)
  }

  render() {
    const {
      authToken,
      ga: propsGA,
      dms: propsDMS,
    } = this.props
    const {
      ga: stateGA,
      dms: stateDMS,
      AUTOLOGIN_STATE,
      paperApiKey,
      paperApiSecret,
      apiKey,
      apiSecret,
    } = this.state
    const ga = stateGA ?? propsGA
    const dms = stateDMS ?? propsDMS

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
                <DeadMenSwitch onOptionChange={this.onOptionChange} checked={!!dms} />

                <CheckboxesSections
                  onOptionChange={this.onOptionChange}
                  gaChecked={!!ga}
                  autologinChecked={AUTOLOGIN_STATE}
                  updateAutoLoginState={this.updateAutoLoginState}
                />

                <div className='hfui-settings__option'>
                  <Button
                    onClick={() => this.onSettingsSave(authToken)}
                    label='Save'
                    className='settings-save'
                    green
                  />
                </div>

                <APIKeysSection
                  onOptionChange={this.onOptionChange}
                  apiKey={apiKey}
                  apiSecret={apiSecret}
                  paperApiKey={paperApiKey}
                  paperApiSecret={paperApiSecret}
                />

                <div className='hfui-settings__option'>
                  <Button
                    onClick={() => this.onSettingsSave(authToken)}
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
