import React from 'react'
import { Icon } from 'react-fa'

import HFIcon from '../../ui/HFIcon'
import NavbarButton from '../NavbarButton'
import { propTypes, defaultProps } from './Navbar.props'
import './style.css'

const NAVBAR_ITEMS = [{
  route: '/',
  label: 'Trading Terminal',
}, {
  route: '/data',
  label: 'Market Data',
}, {
  route: '/strategy-editor',
  label: 'Strategy Editor',
}, {
  route: '/strategy-exec',
  label: 'Strategy Execution',
}, {
  route: '/settings',
  label: [
    <Icon name='cog' key='cog' />,
    <p key='label'>Settings</p>,
  ],
}]

export default class Navbar extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    return (
      <div className='hfui-navbar__wrapper'>
        <HFIcon />

        <ul className='hfui-navbar__main-links'>
          {NAVBAR_ITEMS.map(val => (
            <li key={val.route}>
              <NavbarButton
                route={val.route}
                label={val.label}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
