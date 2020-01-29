/* eslint-disable no-mixed-operators */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import _capitalize from 'lodash/capitalize'
import ClassNames from 'classnames'
import { UserSettings } from 'bfx-hf-ui-config'

import StatusBar from '../../components/StatusBar'
import Select from '../../ui/Select'
import Checkbox from '../../ui/Checkbox'
import Input from '../../ui/Input'
import Button from '../../ui/Button'

import './style.css'

export default class Settings extends React.Component {
  constructor(props) {
    super(props)
    const {
      savedState = {}, activeExchange, chart, theme, dms,
    } = props
    const {
      currentExchange = activeExchange,
    } = savedState

    this.state = {
      currentExchange,
      apiKey: '',
      apiSecret: '',
      password: '',
      chart,
      theme,
      dms,
    }

    this.onSubmitAPIKeys = this.onSubmitAPIKeys.bind(this)
    this.onSettingsSave = this.onSettingsSave.bind(this)
  }

  onOptionChange(e, option) {
    this.setState({ [option]: typeof e === 'object' ? e.value : e })
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

  onSettingsSave(updateSettings, authToken) {
    const {
      apiKey, apiSecret, chart, dms, theme,
    } = this.state
    if (apiKey.trim().length > 0 && apiSecret.trim().length > 0) {
      this.onSubmitAPIKeys(this.state)
    }
    updateSettings({
      chart, dms, theme, authToken,
    })
  }

  render() {
    const themes = Object.keys(UserSettings.THEMES).map(key => UserSettings.THEMES[key])
    const charts = Object.keys(UserSettings.CHARTS).map(key => UserSettings.CHARTS[key])
    const { updateSettings, authToken } = this.props
    // eslint-disable-next-line react/destructuring-assignment
    if (this.props.chart && (this.state.chart === undefined || this.state.theme === undefined || this.state.dms === undefined)) {
      const { chart, theme, dms } = this.props
      this.setState({
        chart,
        theme,
        dms,
      })
    }
    const { theme, chart, dms } = this.state

    return (
      <div className='hfui-settingspage__wrapper'>
        <div className='hfui-settings__title'>
            Settings
        </div>
        <div className='hfui-settings__content'>
          <div>
            <ul className='hfui-settings__options'>
              <li>
                <p className='hfui-settings__option-label'>Theme</p>
                <div className='hfui-settings__item-list'>
                  <Select
                    value={{ value: theme, label: _capitalize(theme) }}
                    className={ClassNames('hfui-setting__select')}
                    options={themes.map(t => ({ value: t, label: t }))}
                    onChange={e => this.onOptionChange(e, 'theme')}
                  />
                </div>
              </li>
              <li>
                <p className='hfui-settings__option-label'>Chart</p>
                <div className='hfui-settings__item-list'>
                  <Select
                    value={{ value: chart, label: chart }}
                    className={ClassNames('hfui-setting__select')}
                    options={charts.map(c => ({ value: c, label: c }))}
                    onChange={e => this.onOptionChange(e, 'chart')}
                  />
                  {chart && chart === UserSettings.CHARTS.TRADING_VIEW && (
                    <div style={{ marginTop: '15px', fontSize: '11px', color: '#ee5555' }}>
                       Attention! Orders/postions won't show up, while you are using Trading view chart.
                    </div>
                  )}
                </div>
              </li>
              <li>
                <p className='hfui-settings__option-label'>Dead Man Switch</p>
                <p className='hfui-settings__option-description'>
                  Enabling the deadman switch will automatically cancel all active orders when the HF disconnects
                </p>
                <div className='hfui-settings__option-check'>
                  <Checkbox
                    className={ClassNames('hfui-settings_check')}
                    onChange={e => this.onOptionChange(e, 'dms')}
                    label='DMS'
                    value={dms}
                  />
                </div>
              </li>
              <li>
                <p className='hfui-settings__option-label'>API credentials</p>
                <div className='hfui-settings__option'>
                  <Input
                    placeholder='API Key'
                    onChange={e => this.onOptionChange(e, 'apiKey')}
                    className={ClassNames('hfui-settings__item-list')}
                  />
                  <Input
                    type='password'
                    placeholder='API Secret'
                    onChange={e => this.onOptionChange(e, 'apiSecret')}
                    className={ClassNames('hfui-settings__item-list')}
                  />
                </div>
              </li>
              <li>
                <div className='hfui-settings__option'>
                  <Button
                    onClick={() => this.onSettingsSave(updateSettings, authToken)}
                    label='Save'
                    gray
                    className={ClassNames('settings-save')}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <StatusBar
          key='statusbar'
          displayLayoutControls={false}
        />
      </div>
    )
  }
}
