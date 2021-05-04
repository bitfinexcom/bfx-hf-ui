import React from 'react'
import PropTypes from 'prop-types'
import _size from 'lodash/size'
import _trim from 'lodash/trim'

import Input from '../../ui/Input'
import Button from '../../ui/Button'
import Checkbox from '../../ui/Checkbox'
import StatusBar from '../../components/StatusBar'
import SwitchMode from '../../components/SwitchMode'
import TradingModeModal from '../../components/TradingModeModal'
import BadConnectionModal from '../../components/BadConnectionModal'
import {
  getAutoLoginState,
  isDevEnv as devEnv,
  updateAutoLoginState,
} from '../../util/autologin'
import {
  PAPER_MODE,
  MAIN_MODE,
} from '../../redux/reducers/ui'
import NavbarButton from '../../components/NavbarButton'

import './style.css'

const isDevEnv = devEnv()
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
      apiKey,
      apiSecret,
      paperApiKey,
      paperApiSecret,
      ga: stateGA,
      dms: stateDMS,
    } = this.state
    const ga = stateGA ?? propsGA
    const dms = stateDMS ?? propsDMS

    if (_size(_trim(apiKey)) && _size(_trim(apiSecret))) {
      this.onSubmitAPIKeys(this.state)
    }

    if (_size(_trim(paperApiKey)) && _size(_trim(paperApiSecret))) {
      this.onSubmitPaperAPIKeys(this.state)
    }

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
      <>
        <div className='hfui-settings__control-toggle'>
          <p>
            Paper Trading
          </p>
          <TradingModeModal />
          <BadConnectionModal />
          <SwitchMode />
        </div>
        <div className='hfui-settingspage__wrapper'>
          <div className='hfui-settings__title'>
            Settings
          </div>
          <div className='hfui-settings__content'>
            <ul className='hfui-settings__options'>

              <li>
                <p className='hfui-settings__option-label'>Dead Man Switch</p>
                <div className='hfui-settings__option-description'>
                  <p>
                    Enabling the Dead Man switch will automatically cancel all
                    active orders when the application closes.
                  </p>
                  <p className='important'>
                    <em>Disabling this should be done with caution!</em>
                  </p>
                  <p>
                    Algorithmic orders are cancelled on application close;
                    without the Dead Man switch, any atomic orders created by an
                    AO will remain open, and state may be lost when the
                    application is started up again.
                  </p>
                </div>
                <div className='hfui-settings__option-check dms'>
                  <Checkbox
                    className='hfui-settings_check'
                    onChange={newState => this.onOptionChange(newState, 'dms')}
                    label='DMS'
                    value={!!dms}
                  />
                </div>
              </li>

              <li>
                <div className='hfui-settings__option-check ga'>
                  <Checkbox
                    className='hfui-settings_check'
                    onChange={newState => this.onOptionChange(newState, 'ga')}
                    label='Usage reporting'
                    value={!!ga}
                  />
                </div>
              </li>

              {isDevEnv && (
                <>
                  <li className='hfui-settings__option-check'>
                    <Checkbox
                      label='Auto-login in development mode'
                      value={AUTOLOGIN_STATE}
                      onChange={(state) => { this.updateAutoLoginState(state) }}
                    />
                  </li>
                  <div className='hfui-settings__option-description'>
                    <p>
                      It`s not required to press the `Save` button to update the auto-login state.
                      The state will be updated and saved right after you click on the checkbox.
                    </p>
                  </div>
                </>
              )}

              <li>
                <p className='hfui-settings__option-label'>API credentials</p>
                <div className='hfui-settings__option-description'>
                  <p>Fill in to update stored values</p>
                  <p>Production API Keys:</p>
                </div>
                <div className='hfui-settings__option'>
                  <Input
                    type='text'
                    placeholder='API Key'
                    onChange={value => this.onOptionChange(value, 'apiKey')}
                    className='hfui-settings__item-list api-key'
                    value={apiKey}
                  />
                  <Input
                    type='password'
                    placeholder='API Secret'
                    onChange={value => this.onOptionChange(value, 'apiSecret')}
                    className='hfui-settings__item-list api-secret'
                    value={apiSecret}
                  />
                </div>
                <div className='hfui-settings__option-description'>
                  <p>
                    <NavbarButton
                      label='Paper Trading'
                      external='https://support.bitfinex.com/hc/en-us/articles/900001525006-Paper-Trading-test-learn-and-simulate-trading-strategies-'
                      route=''
                    />
                    &nbsp;API Keys:
                  </p>
                </div>
                <div className='hfui-settings__option'>
                  <Input
                    type='text'
                    placeholder='Paper Trading API Key'
                    onChange={value => this.onOptionChange(value, 'paperApiKey')}
                    className='hfui-settings__item-list api-key'
                    value={paperApiKey}
                  />
                  <Input
                    type='password'
                    placeholder='Paper Trading API Secret'
                    onChange={value => this.onOptionChange(value, 'paperApiSecret')}
                    className='hfui-settings__item-list api-secret'
                    value={paperApiSecret}
                  />
                </div>
              </li>

              <li>
                <div className='hfui-settings__option'>
                  <Button
                    onClick={() => this.onSettingsSave(authToken)}
                    label='Save'
                    className='settings-save'
                    green
                  />
                </div>
              </li>
            </ul>
          </div>
          <StatusBar
            key='statusbar'
            displayLayoutControls={false}
          />
        </div>
      </>
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
