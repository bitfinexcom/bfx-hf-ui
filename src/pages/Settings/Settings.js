import React from 'react'
import _isObject from 'lodash/isObject'
import _isUndefined from 'lodash/isUndefined'
import _capitalize from 'lodash/capitalize'
import { UserSettings } from 'bfx-hf-ui-config'

import StatusBar from '../../components/StatusBar'
import Select from '../../ui/Select'
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
      savedState = {}, activeExchange, chart, theme, dms, ga, bgStrategyExec,
    } = props

    const { currentExchange = activeExchange } = savedState

    this.state = {
      ...this.state,
      currentExchange,
      bgStrategyExec,
      chart,
      theme,
      dms,
      ga,
    }

    this.onSubmitAPIKeys = this.onSubmitAPIKeys.bind(this)
    this.onSettingsSave = this.onSettingsSave.bind(this)
  }

  onOptionChange(e, option) {
    this.setState(() => ({ [option]: _isObject(e) ? e.value : e }))
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
      apiKey, apiSecret, chart, dms, theme, ga, bgStrategyExec,
    } = this.state

    if (apiKey.trim().length > 0 && apiSecret.trim().length > 0) {
      this.onSubmitAPIKeys(this.state)
    }

    updateSettings({
      chart, dms, theme, authToken, ga, bgStrategyExec,
    })

    gaUpdateSettings()
  }

  render() {
    const { CHARTS } = UserSettings
    const charts = Object.keys(CHARTS).map(key => CHARTS[key])
    const { authToken } = this.props

    // eslint-disable-next-line react/destructuring-assignment
    if (this.props.chart && (!this.state.chart || _isUndefined(this.state.dms))) {
      const {
        chart, theme, dms, ga, bgStrategyExec,
      } = this.props

      this.setState(() => ({
        chart, theme, dms, ga, bgStrategyExec,
      }))
    }

    const {
      chart, dms, ga, bgStrategyExec,
    } = this.state

    return (
      <div className='hfui-settingspage__wrapper'>
        <div className='hfui-settings__title'>
          Settings
        </div>

        <div className='hfui-settings__content'>
          <div>
            <ul className='hfui-settings__options'>
              {/*
              <li>
                <p className='hfui-settings__option-label'>Theme</p>
                <div className='hfui-settings__item-list'>
                  <Select
                    value={{ value: theme, label: _capitalize(theme) }}
                    className='hfui-setting__select'
                    options={themes.map(t => ({ value: t, label: t }))}
                    onChange={e => this.onOptionChange(e, 'theme')}
                  />
                </div>
              </li>
              */}

              <li>
                <p className='hfui-settings__option-label'>Chart</p>
                <div className='hfui-settings__option-description'>
                  <p>
                    NOTE: Only the HF UI Chart supports rendering order and position
                    lines
                  </p>
                </div>

                <div className='hfui-settings__item-list'>
                  <Select
                    value={{ value: chart, label: _capitalize(chart) }}
                    className='hfui-setting__select'
                    options={charts.map(c => ({ value: c, label: _capitalize(c) }))}
                    onChange={e => this.onOptionChange(e, 'chart')}
                  />
                </div>
              </li>

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
                <div className='hfui-settings__option-check'>
                  <Checkbox
                    className='hfui-settings_check'
                    onChange={e => this.onOptionChange(e, 'dms')}
                    label='DMS'
                    value={dms}
                  />
                </div>
              </li>

              <li>
                <p className='hfui-settings__option-label'>
                  Background Strategy Execution
                </p>
                <div className='hfui-settings__option-description'>
                  <p>
                    When enabled, strategies will be executed in a separate
                    long-lived process that remains active even when the HF UI
                    application is closed.
                  </p>
                  <p className='important'>
                    <em>
                      It is recommended to enable this option when a strategy
                      must not be interrupted, or must run for long periods of
                      time.
                    </em>
                  </p>
                </div>

                <div className='hfui-settings__option-check'>
                  <Checkbox
                    className='hfui-settings_check'
                    onChange={e => this.onOptionChange(e, 'bgStrategyExec')}
                    label='Background Strategy Execution'
                    value={bgStrategyExec}
                  />
                </div>
              </li>

              <li>
                <div className='hfui-settings__option-check'>
                  <Checkbox
                    className='hfui-settings_check'
                    onChange={e => this.onOptionChange(e, 'ga')}
                    label='Usage reporting'
                    value={ga}
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
                    placeholder='API Key'
                    onChange={e => this.onOptionChange(e, 'apiKey')}
                    className='hfui-settings__item-list'
                  />
                  <Input
                    type='password'
                    placeholder='API Secret'
                    onChange={e => this.onOptionChange(e, 'apiSecret')}
                    className='hfui-settings__item-list'
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
        </div>
        <StatusBar
          key='statusbar'
          displayLayoutControls={false}
        />
      </div>
    )
  }
}
