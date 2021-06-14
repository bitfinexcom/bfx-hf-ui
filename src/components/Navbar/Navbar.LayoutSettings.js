import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import cx from 'classnames'
import _filter from 'lodash/filter'
import _values from 'lodash/values'
import _map from 'lodash/map'

import OutsideClickHandler from 'react-outside-click-handler'
import UIActions from '../../redux/actions/ui'
import { getLayouts, getActiveMarket, getCurrentUnsavedLayout } from '../../redux/selectors/ui'

import { ReactComponent as LayoutIcon } from './layout-icon.svg'
import NavbarButton from './Navbar.Button'
import { Routes } from './Navbar.constants'

function Item({
  children, isLayout, isSelected, ...props
}) {
  return (
    <div
      className={cx('hfui-navbar__layout-settings__item', {
        'is-layout': isLayout,
        'is-selected': isSelected,
      })}
      {...props}
    >
      {children}
    </div>
  )
}

const layoutTypeMapping = {
  [Routes.tradingTerminal.pathname]: 'trading',
  [Routes.marketData.pathname]: 'data',
}

export default function LayoutSettings() {
  const [isOpen, setIsOpen] = useState(false)
  const layouts = useSelector(getLayouts)
  const location = useLocation()
  const currentLayout = useSelector(getCurrentUnsavedLayout)

  const layoutId = 'Default Market Data'

  if (![
    Routes.tradingTerminal.pathname,
    Routes.marketData.pathname,
  ].includes(location.pathname)) {
    return null
  }

  const layoutType = layoutTypeMapping[location.pathname]
  const layoutNames = _filter(_values(layouts), layout => layout.type === layoutType)

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
            <div className='hfui-navbar__layout-settings__menu-buttons' onClick={() => setIsOpen(false)}>
              {location.pathname === Routes.tradingTerminal.pathname && (
                <>
                  <Item onClick={() => window.grid.onToggleAddComponentModal()}>
                    Add Component
                  </Item>
                  <Item onClick={() => window.grid.onSaveLayout()}>
                    Save
                  </Item>
                </>
              )}
              {location.pathname === Routes.marketData.pathname && (
                <>
                  <Item onClick={() => window.grid.onToggleAddComponentModal()}>
                    Add Component
                  </Item>
                  <Item onClick={() => window.grid.onSaveLayout()}>
                    Save
                  </Item>
                  <Item>
                    Create New Layout
                  </Item>
                  <div className='hfui-navbar__layout-settings__separator' />
                  {_map(layoutNames, layoutName => (
                    <Item isLayout isSelected={layoutName === layoutId}>
                      {layoutName}
                      <div className='hfui-navbar__layout-settings__delete'>
                        <i className='icon-clear' onClick={() => {}} />
                      </div>
                    </Item>
                  ))}
                </>
              )}
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </div>
  )
}
