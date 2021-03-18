import React from 'react'
import PropTypes from 'prop-types'

import Input from '../../ui/Input'
import Button from '../../ui/Button'
import Checkbox from '../../ui/Checkbox'
import StatusBar from '../../components/StatusBar'
import SwitchMode from '../../components/SwitchMode'
import TradingModeModal from '../../components/TradingModeModal'
import {
  getAutoLoginState,
  isDevEnv as devEnv,
  updateAutoLoginState,
} from '../../util/autologin'

import './style.css'

export default class Settings extends React.PureComponent {
  static propTypes = {
    ga: PropTypes.bool,
    dms: PropTypes.bool,
    activeExchange: PropTypes.string,
    authToken: PropTypes.string.isRequired,
    getActiveAOs: PropTypes.func.isRequired,
    currentMode: PropTypes.string.isRequired,
    submitAPIKeys: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
    gaUpdateSettings: PropTypes.func.isRequired,
  }

  static defaultProps = {
    ga: null,
    dms: null,
    activeExchange: 'bitfinex',
  }

  constructor(props) {
    super(props)
    const {
      activeExchange,
    } = props

    this.state = {
      apiKey: '',
      apiSecret: '',
      isDevEnv: devEnv(),
      currentExchange: activeExchange,
      AUTOLOGIN_STATE: getAutoLoginState(),
    }
  }

  onOptionChange(value, identifier) {
    this.setState(() => ({
      [identifier]: value,
    }))
  }

  onSubmitAPIKeys({ apiKey, apiSecret }) {
    const { submitAPIKeys, authToken, currentMode } = this.props
    const { currentExchange } = this.state

    submitAPIKeys({
      authToken,
      exID: currentExchange,
      apiKey,
      apiSecret,
    }, currentMode)
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
      ga: stateGA,
      dms: stateDMS,
    } = this.state
    const ga = stateGA ?? propsGA
    const dms = stateDMS ?? propsDMS

    if (apiKey.trim().length && apiSecret.trim().length) {
      this.onSubmitAPIKeys(this.state)
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
      isDevEnv,
      ga: stateGA,
      dms: stateDMS,
      AUTOLOGIN_STATE,
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
                </div>
                <div className='hfui-settings__option'>
                  <Input
                    type='text'
                    placeholder='API Key'
                    onChange={value => this.onOptionChange(value, 'apiKey')}
                    className='hfui-settings__item-list api-key'
                  />
                  <Input
                    type='password'
                    placeholder='API Secret'
                    onChange={value => this.onOptionChange(value, 'apiSecret')}
                    className='hfui-settings__item-list api-secret'
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
