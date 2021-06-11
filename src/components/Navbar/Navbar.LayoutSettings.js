import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import OutsideClickHandler from 'react-outside-click-handler'

import { ReactComponent as LayoutIcon } from './layout-icon.svg'
import NavbarButton from './Navbar.Button'

export default function LayoutSettings() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='hfui-navbar__layout-settings'>
      <NavbarButton
        icon={LayoutIcon}
        onClick={() => setIsOpen(true)}
        className={isOpen ? 'is-open' : undefined}
      />
      {isOpen && (
        <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
          <div className='hfui-navbar__layout-settings__menu'>
            <div className='hfui-navbar__layout-settings__title'>
              Layout settings
            </div>
            <div className='hfui-navbar__layout-settings__item'>
              Add component
            </div>
            <div className='hfui-navbar__layout-settings__item'>
              Save
            </div>
            <div className='hfui-navbar__layout-settings__item'>
              Create as new layout
            </div>
            <div className='hfui-navbar__layout-settings__separator' />
            <div className='hfui-navbar__layout-settings__item is-layout is-selected'>
              Trading Layout
            </div>
            <div className='hfui-navbar__layout-settings__item is-layout is-selected'>
              My Custom Layout
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </div>
  )
}
