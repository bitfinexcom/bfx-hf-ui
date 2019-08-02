import React from 'react'
import {
  Button, Card, Elevation, InputGroup,
} from '@blueprintjs/core'
import Settings from '../../ui/SettingsMenu'
import { store } from '../../StoreWrapper'
import APIComboDialog from '../../components/APIComboDialogMenu'

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
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
        <div className='hfui_sidenavbar' style={{ backgroundColor: 'rgba(27,38,45,0.95)' }}>
          <div style={{ marginTop: '90px' }} />
          <Settings />
        </div>
        <div style={{ flex: 1, marginTop: '90px'}}>
          <APIComboDialog onSubmit={this.onSubmitKeys} />
        </div>
      </div>
    )
  }
}
