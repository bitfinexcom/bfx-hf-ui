import React from 'react'

import StatusBar from '../../components/StatusBar'
import Checkbox from '../../ui/Checkbox'
import Input from '../../ui/Input'
import Button from '../../ui/Button'

import { propTypes, defaultProps } from './Settings.props'
import './style.css'

export default class Settings extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    apiKey: '',
    apiSecret: '',
  }

  constructor(props) {
    super(props)
    const {
      savedState = {}, activeExchange, theme, dms, ga,
    } = props

    const { currentExchange = activeExchange } = savedState

    this.state = {
      ...this.state,
      currentExchange,
      theme,
      dms,
      ga,
    }

    this.onSubmitAPIKeys = this.onSubmitAPIKeys.bind(this)
    this.onSettingsSave = this.onSettingsSave.bind(this)
  }
  shouldComponentUpdate(nextProps, nextState) {
    // eslint-disable-next-line
    if (this.state.dms !== nextState.dms || this.props.dms !== nextProps.dms || this.state.ga !== nextState.ga || this.props.ga !== nextProps.ga) {
      return true
    }
    return false
  }
  componentDidUpdate() {}
  getSnapshotBeforeUpdate() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.dms === undefined) {
      const {
        dms, ga,
      } = this.props
      this.setState(() => ({
        dms, ga,
      }))
    }
    return null
  }

  onOptionChange(e, option) {
    this.setState(() => ({ [option]: typeof e === 'object' ? e.value : e }))
  }

  onSubmitAPIKeys({ apiKey, apiSecret }) {
    const { submitAPIKeys, authToken } = this.props
    const { currentExchange } = this.state

    submitAPIKeys({
      authToken,
      exID: currentExchange,
      apiKey,
      apiSecret,
    })
  }

  onSettingsSave(authToken) {
    const { updateSettings, gaUpdateSettings } = this.props
    const {
      apiKey, apiSecret, dms, ga,
    } = this.state

    if (apiKey.trim().length > 0 && apiSecret.trim().length > 0) {
      this.onSubmitAPIKeys(this.state)
    }

    updateSettings({
      dms, authToken, ga,
    })
    gaUpdateSettings()
  }

  getValidBool(value) { //eslint-disable-line
    return typeof value === 'boolean' ? value : false
  }

  render() {
    const { authToken } = this.props
    const {
      dms, ga,
    } = this.state
    return (
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
                  onChange={e => this.onOptionChange(e, 'dms')}
                  label='DMS'
                  value={this.getValidBool(dms)} // eslint-disable-line
                />
              </div>
            </li>

            <li>
              <div className='hfui-settings__option-check ga'>
                <Checkbox
                  className='hfui-settings_check'
                  onChange={e => this.onOptionChange(e, 'ga')}
                  label='Usage reporting'
                  value={this.getValidBool(ga)} // eslint-disable-line
                />
              </div>
            </li>

            <li>
              <p className='hfui-settings__option-label'>API credentials</p>
              <div className='hfui-settings__option-description'>
                <p>Fill in to update stored values</p>
              </div>
              <div className='hfui-settings__option'>
                <Input
                  type='text'
                  placeholder='API Key'
                  onChange={e => this.onOptionChange(e, 'apiKey')}
                  className='hfui-settings__item-list api-key'
                />
                <Input
                  type='password'
                  placeholder='API Secret'
                  onChange={e => this.onOptionChange(e, 'apiSecret')}
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
    )
  }
}
