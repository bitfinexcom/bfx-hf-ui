import React from 'react'
import { Icon } from 'react-fa'
import { useDispatch } from 'react-redux'

import HFIcon from '../../ui/HFIcon'
import UIActions from '../../redux/actions/ui'
import NavbarButton from '../NavbarButton'
import ExchangeInfoBarButton from '../ExchangeInfoBar/ExchangeInfoBar.Button'
import SwitchMode from '../SwitchMode'

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

  return (
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
      <div className='hfui-tradingpage__menu'>
        <div className='hfui-exchangeinfobar__buttons'>
          <ExchangeInfoBarButton
            icon='save'
            onClick={() => window.grid.onSaveLayout()}
          />
          <ExchangeInfoBarButton
            icon='plus'
            onClick={() => window.grid.onToggleAddComponentModal()}
          />
          <ExchangeInfoBarButton
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
