/* eslint-disable react/prop-types */
import React from 'react'

import StatusBar from '../../components/StatusBar'
import SubmitAPIKeysModal from '../../components/OrderForm/Modals/SubmitAPIKeysModal'
import SettingsMenu from '../../components/SettingsMenu'

import UserSettings from './UserSettings'
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
    const { currentExchange, page, pages } = this.state
    return (
      <div className='hfui-settingspage__wrapper'>
        <div className='hfui-settings__menu'>
          <SettingsMenu pages={pages} onChange={this.changePage} page={page} />
        </div>
        <div className='hfui-settings__content'>
          {(page === 'api' && (
          <SubmitAPIKeysModal
            key='submit-api-key'
            onSubmit={this.onSubmitAPIKeys}
            exID={currentExchange}
            onClose={() => { return null }}
            isModal={false}
          />
          ))}
          {(page === 'user' && (
            <UserSettings />
          ))}
        </div>
        <StatusBar
          key='statusbar'
          displayLayoutControls={false}
        />
      </div>
    )
  }
}
