/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
import React from 'react'
import _capitalize from 'lodash/capitalize'
import ClassNames from 'classnames'

import StatusBar from '../../components/StatusBar'
import Select from '../../ui/Select'
import Checkbox from '../../ui/Checkbox'
import Input from '../../ui/Input'
import Button from '../../ui/Button'

import './style.css'

export default class Settings extends React.Component {
  constructor(props) {
    super(props)
    const { savedState = {}, activeExchange } = props
    const {
      currentExchange = activeExchange,
    } = savedState

    this.state = {
      currentExchange,
      page: 'api',
      pages: [
        {
          name: 'api',
          title: 'API credentials',
        },
        {
          name: 'user',
          title: 'User settings',
        },
      ],
    }

    this.onSubmitAPIKeys = this.onSubmitAPIKeys.bind(this)
    this.changePage = this.changePage.bind(this)
  }

  onSubmitAPIKeys({ apiKey, apiSecret, password }) {
    const { submitAPIKeys, authToken } = this.props
    const { currentExchange } = this.state

    submitAPIKeys({
      authToken,
      exID: currentExchange,
      apiKey,
      apiSecret,
      password,
    })
  }

  changePage(page) {
    this.setState({ page })
  }


  render() {
    const themes = ['bfx-dark-theme', 'bfx-light-theme']
    const charts = ['Trading view', 'HF custom chart']

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
                <div className='hfui-settings__option'>
                  <Select
                    value={{ value: themes[0], label: _capitalize(themes[0]) }}
                    className={ClassNames('hfui-setting__select')}
                    options={themes.map(theme => ({ value: theme, label: _capitalize(theme) }))}
                    onChange={() => console.log('theme select')}
                  />
                </div>
              </li>
              <li>
                <p className='hfui-settings__option-label'>Chart</p>
                <div className='hfui-settings__option'>
                  <Select
                    value={{ value: charts[0], label: _capitalize(charts[0]) }}
                    className={ClassNames('hfui-setting__select')}
                    options={charts.map(chart => ({ value: chart, label: _capitalize(chart) }))}
                    onChange={() => console.log('chart select')}
                  />
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
                    onChange={() => console.log('changed')}
                    label='DMS'
                  />
                </div>
              </li>
              <li>
                <p className='hfui-settings__option-label'>API credentials</p>
                <div className='hfui-settings__option'>
                  <Input
                    placeholder='API Key'
                    onChange={() => console.log('api key changed')}
                    className={ClassNames('hfui-settings__item-list')}
                  />
                  <Input
                    placeholder='API Secret'
                    onChange={() => console.log('secret changed')}
                    className={ClassNames('hfui-settings__item-list')}
                  />
                  <Button
                    label='Save Credentials'
                    gray
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
