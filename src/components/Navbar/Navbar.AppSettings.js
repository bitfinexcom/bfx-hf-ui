import React, { useState } from 'react'

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
