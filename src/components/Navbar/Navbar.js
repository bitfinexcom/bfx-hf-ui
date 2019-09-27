import React from 'react'
import axios from 'axios'

import NavbarButton from '../NavbarButton'
import { propTypes, defaultProps } from './Navbar.props'
import './style.css'


export default class Navbar extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    axios
      .get('https://raw.githubusercontent.com/bitfinexcom/bfx-hf-ui/master/package.json')
      .then(({ data }) => {
        const lastVersion = data.version
        // eslint-disable-next-line global-require
        const currVersion = require('../../../package.json').version
        console.log(lastVersion, currVersion, this.state)
        // eslint-disable-next-line react/no-unused-state
        this.setState({ lastVersion, currVersion })
      })
    const { lastVersion, currVersion } = this.state || {}

    return (
      <div className='hfui-navbar__wrapper'>
        <ul className='hfui-navbar__main-links'>
          <li>
            <NavbarButton
              route='/'
              label='Trading Terminal'
            />
          </li>

          <li>
            <NavbarButton
              route='/data'
              label='Market Data'
            />
          </li>

          <li>
            <NavbarButton
              route='/strategy-editor'
              label='Strategy Editor'
            />
          </li>
          {
              lastVersion && lastVersion !== currVersion ? (
                <li style={{ marginTop: '9px' }}>
                  <NavbarButton
                    label='Update to last version'
                    external='https://github.com/bitfinexcom/bfx-hf-ui/releases'
                  />
                </li>
              ) : null
          }
        </ul>
      </div>
    )
  }
}
