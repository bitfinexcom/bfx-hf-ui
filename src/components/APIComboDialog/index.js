import React from 'react'
import {
  Button, Card, Elevation, InputGroup,
} from '@blueprintjs/core'

export default class APIComboDialog extends React.Component {
  state = {
    key: '',
    secret: '',
  }

  constructor(props) {
    super(props)

    this.onKeyChange = this.onKeyChange.bind(this)
    this.onSecretChange = this.onSecretChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onKeyChange(e) {
    const { value } = e.target

    this.setState(() => ({ key: value }))
  }

  onSecretChange(e) {
    const { value } = e.target

    this.setState(() => ({ secret: value }))
  }

  onSubmit() {
    const { key, secret } = this.state
    const { onSubmit } = this.props

    onSubmit({ key, secret })
  }

  render() {
    const { key, secret } = this.state

    return (
      <div className='hfui-api-combo-dialog'>
        <Card elevation={Elevation.TWO}>
          <p>No Bitfinex API key/secret configured. Enter your key combination below to connect to the Bitfinex API.</p>

          <InputGroup
            placeholder='API Key'
            onChange={this.onKeyChange}
            value={key}
          />
          <br />
          <InputGroup
            placeholder='API Secret'
            onChange={this.onSecretChange}
            value={secret}
          />
          <br />
          <Button
            onClick={this.onSubmit}
          >
Submit
          </Button>
        </Card>
      </div>
    )
  }
}
