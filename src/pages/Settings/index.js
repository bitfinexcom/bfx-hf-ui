import React from 'react'
import Settings from '../../ui/SettingsMenu'
import {
  Button, Card, Elevation, InputGroup,
} from '@blueprintjs/core'
export default class SettingsView extends React.Component {
  render() {
    return (
      <div className='hfui_view__wrapper'>
        <h1>Settings</h1>
        <Settings />
        <div className='hfui-api-combo-dialog-menu'>
        <Card>
          <p>No Bitfinex API key/secret configured. Enter your key combination below to connect to the Bitfinex API.</p>

          <InputGroup
            placeholder='API Key'
          />
          <br />
          <InputGroup
            placeholder='API Secret'
          />
          <br />
          <Button
          >
Submit
          </Button>
        </Card>
      </div>
      </div>
    )
  }
}
