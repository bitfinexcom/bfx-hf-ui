import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { ReactComponent as SettingsIcon } from './settings-icon.svg'
import NavbarButton from './Navbar.Button'

import AppSettingsModal from '../AppSettingsModal'

export default function AppSettings() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='hfui-navbar__app-settings'>
      <NavbarButton
        icon='settings-icon'
        className='hfui-navbar__app-settings__icon'
        onClick={() => setIsOpen(true)}
      />
      <AppSettingsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  )
}
