import React, { useState } from 'react'
import { Icon } from 'react-fa'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'

import HFIcon from '../../ui/HFIcon'
import UIActions from '../../redux/actions/ui'
import NavbarLink from '../NavbarButton'
import NavbarButton from './Navbar.Button'
import SwitchMode from '../SwitchMode'

import LayoutSettings from './Navbar.LayoutSettings'

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

const Navbar = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const isTradingPage = location.pathname === '/'

  return (
    <div className='hfui-navbar__wrapper'>
      <HFIcon className='hfui-navbar__logo' />
      <ul className='hfui-navbar__main-links'>
        {items.map(val => (
          <li key={val.route}>
            <NavbarLink
              route={val.route}
              label={val.label}
            />
          </li>
        ))}
      </ul>
      <div className='hfui-tradingpage__menu'>
        <div className='hfui-exchangeinfobar__buttons'>
          <LayoutSettings />
          <NavbarButton
            icon='notifications'
            onClick={() => dispatch(UIActions.switchNotifcationPanel())}
          />
        </div>
        <div className='hfui-tradingpaper__control'>
          <div className='hfui-tradingpaper__control-toggle'>
            <p>Paper Trading</p>
            <SwitchMode />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
