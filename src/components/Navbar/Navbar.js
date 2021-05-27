import React from 'react'
import { Icon } from 'react-fa'

import HFIcon from '../../ui/HFIcon'
import NavbarButton from '../NavbarButton'

import './style.css'

const items = [
  {
    route: '/',
    label: 'Trading Terminal',
  },
  {
    route: '/data',
    label: 'Market Data',
  },
  {
    route: '/strategy-editor',
    label: 'Strategy Editor',
  },
  {
    route: '/settings',
    label: [<Icon name='cog' key='cog' />, <p key='label'>Settings</p>],
  },
]

const Navbar = () => (
  <div className='hfui-navbar__wrapper'>
    <HFIcon />
    <ul className='hfui-navbar__main-links'>
      {items.map(val => (
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

export default Navbar
