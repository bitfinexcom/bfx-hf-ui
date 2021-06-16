import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import cx from 'classnames'
import _entries from 'lodash/entries'
import _map from 'lodash/map'
import _get from 'lodash/get'

import OutsideClickHandler from 'react-outside-click-handler'
import { selectLayout, deleteLayout } from '../../redux/actions/ui'
import { getLayouts, getLayoutID } from '../../redux/selectors/ui'
import { getLocation } from '../../redux/selectors/router'

import { ReactComponent as LayoutIcon } from './layout-icon.svg'
import NavbarButton from './Navbar.Button'
import * as Routes from '../../constants/routes'

import AddLayoutComponentModal from '../AddLayoutComponentModal'
import CreateNewLayoutModal from '../CreateNewLayoutModal'

const Item = ({
  isLayout,
  isSelected,
  isDisabled,
  children,
  ...props
}) => (
  <div
    className={cx('hfui-navbar__layout-settings__item', {
      'is-layout': isLayout,
      'is-selected': isSelected,
      'is-disabled': isDisabled,
    })}
    {...props}
  >
    {children}
  </div>
)

export default function LayoutSettings() {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [isCreateNewLayoutModalOpen, setIsCreateNewLayoutModalOpen] = useState(false)
  const [isAddLayoutComponentModalOpen, setIsAddLayoutComponentModalOpen] = useState(false)
  // const { layoutID, layoutDef } = useLayout()
  const layouts = useSelector(getLayouts)
  const layoutID = useSelector(getLayoutID)
  const layoutIsDirty = useSelector(state => state.ui.layoutIsDirty)
  const layout = _get(layouts, layoutID, {})
  const { pathname } = useSelector(getLocation)

  if (![
    Routes.tradingTerminal.path,
    Routes.marketData.path,
  ].includes(pathname)) {
    return null
  }

  const selectableLayouts = _entries(layouts)
    // eslint-disable-next-line no-shadow
    .filter(([, layout]) => layout.routePath === pathname)
    .sort((a, b) => b[1].savedAt - a[1].savedAt)
    // eslint-disable-next-line no-shadow
    .map(([id, layout]) => ({ id, ...layout }))

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
              <Item onClick={() => setIsAddLayoutComponentModalOpen(true)}>
                Add Component
              </Item>
              <Item onClick={() => dispatch(saveLayout())} isDisabled={layout.isDefault || !layoutIsDirty}>
                Save
              </Item>
              <Item onClick={() => setIsCreateNewLayoutModalOpen(true)}>
                Save As...
              </Item>
              <div className='hfui-navbar__layout-settings__separator' />
              {_map(selectableLayouts, layout => (
                <Item
                  key={layout.id}
                  isLayout
                  isSelected={layout.id === layoutID}
                  onClick={() => dispatch(selectLayout(layout.id))}
                >
                  {layout.id}
                  {layout.canDelete && (
                    <div className='hfui-navbar__layout-settings__delete'>
                      <i className='icon-clear' onClick={() => dispatch(deleteLayout(layout.id))} />
                    </div>
                  )}
                </Item>
              ))}
            </div>
          </div>
        </OutsideClickHandler>
      )}
      <CreateNewLayoutModal
        isOpen={isCreateNewLayoutModalOpen}
        onClose={() => setIsCreateNewLayoutModalOpen(false)}
      />
      <AddLayoutComponentModal
        isOpen={isAddLayoutComponentModalOpen}
        onClose={() => setIsAddLayoutComponentModalOpen(false)}
      />
    </div>
  )
}
