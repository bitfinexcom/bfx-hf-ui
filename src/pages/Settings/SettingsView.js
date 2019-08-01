import React from 'react'
import {
  Button, Card, Elevation, InputGroup,
} from '@blueprintjs/core'
import Settings from '../../ui/SettingsMenu'
import { store } from '../../StoreWrapper'
import APIComboDialog from '../../components/APIComboDialog'

export default class SettingsView extends React.Component {

    constructor(props) {
        super(props)
        this.onSubmitKeys = this.onSubmitKeys.bind(this)
    }
    onSubmitKeys({ key, secret } = {}) {
        const { updateAPIKey, cycleBFXConnection } = this.props
        updateAPIKey({ key, secret })
    }

  render() {
    const { apiKey } = this.props
    const { key, secret } = apiKey
    console.log(this.props)
    return (
      <div className='hfui_view__wrapper'>
        <h1>Settings</h1>
        <Settings />
        <APIComboDialog onSubmit={this.onSubmitKeys} />
      </div>
    )
  }
}
