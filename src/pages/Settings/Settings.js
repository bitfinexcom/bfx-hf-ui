/* eslint-disable react/prop-types */
import React from 'react'

import StatusBar from '../../components/StatusBar'
import SubmitAPIKeysModal from '../../components/OrderForm/Modals/SubmitAPIKeysModal'
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
    }

    this.onSubmitAPIKeys = this.onSubmitAPIKeys.bind(this)
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

  render() {
    const { currentExchange } = this.state
    return (
      <div className='hfui-settingspage__wrapper'>
        <div className='hfui-settings__menu'>
            api
        </div>
        <div className='hfui-settings__content'>
          <SubmitAPIKeysModal
            key='submit-api-key'
            onSubmit={this.onSubmitAPIKeys}
            exID={currentExchange}
            onClose={() => { return null }}
          />
        </div>
        <StatusBar
          key='statusbar'
          displayLayoutControls={false}
        />
      </div>
    )
  }
}
