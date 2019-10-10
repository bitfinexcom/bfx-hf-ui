import React from 'react'

import NavbarButton from '../NavbarButton'
import { propTypes, defaultProps } from './Navbar.props'
import './style.css'


export default class Navbar extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
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
        </ul>
      </div>
    )
  }
}
