import React from 'react'
import { useDispatch } from 'react-redux'

import HFIcon from '../../ui/HFIcon'
import UIActions from '../../redux/actions/ui'
import NavbarLink from './Navbar.Link'
import NavbarButton from './Navbar.Button'
import SwitchMode from '../SwitchMode'

import LayoutSettings from './Navbar.LayoutSettings'
import AppSettings from './Navbar.AppSettings'
import * as Routes from '../../constants/routes'

import './style.css'

const Navbar = () => {
  const dispatch = useDispatch()

  return (
    <div className='hfui-navbar__wrapper'>
      <HFIcon className='hfui-navbar__logo' />
      <ul className='hfui-navbar__main-links'>
        {Object.values(Routes).map(({ path, label }) => (
          <li key={path}>
            <NavbarLink
              route={path}
              label={label}
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
          <AppSettings />
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
