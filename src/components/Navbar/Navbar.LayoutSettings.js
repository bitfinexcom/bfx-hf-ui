import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import cx from 'classnames'
import _filter from 'lodash/filter'
import _keys from 'lodash/keys'
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

  // tradingEnabled={tradingEnabled}
  // activeLayout={layoutDef}
  // activeLayoutID={layoutID}
  // layoutDirty={layoutDirty}
  // layouts={layouts}
  // onDeleteLayout={this.onDeleteLayout}
  // onSaveLayout={this.onSaveLayout}
  // onAddLayout={this.onToggleCreateNewLayoutModal}
  // onAddComponent={this.onToggleAddComponentModal}
  // onChangeLayout={this.onChangeLayout}

  // onLayoutChange(incomingLayout) {
  //   const { tradingEnabled, layoutDef, saveLayoutDef } = this.props

  //   const currentLayout = layoutDefToGridLayout(layoutDef)
  //   const newLayout = layoutDefToGridLayout({ layout: incomingLayout })

  //   if (!_isEqual(currentLayout, newLayout)) {
  //     this.setState(() => ({ layoutDirty: true }))
  //   }

  //   saveLayoutDef(gridLayoutToLayoutDef({
  //     canDelete: layoutDef.canDelete,
  //     type: tradingEnabled ? 'trading' : 'data',
  //     layout: incomingLayout,
  //   }, layoutDef))
  // }

  // onSaveLayout() {
  //   const { saveLayout, layoutDef } = this.props
  //   const { layoutID } = this.state

  //   saveLayout(layoutDef, layoutID)

  //   this.setState(() => ({ layoutDirty: false }))
  // }

  // onAddComponentToLayout(component) {
  //   const { layoutDef, saveLayoutDef } = this.props
  //   const newLayout = {
  //     ...layoutDef,

  //     layout: [
  //       ...layoutDef.layout,

  //       {
  //         i: `${nonce()}`,
  //         c: component,
  //         x: _min(layoutDef.layout.map(l => l.x)) || 0,
  //         y: _max(layoutDef.layout.map(l => l.y)) || 0,
  //         ...COMPONENT_DIMENSIONS[component],
  //       },
  //     ],
  //   }
  //   saveLayoutDef(newLayout)
  // }

  // onRemoveComponentFromLayout(i) {
  //   const { layoutDef, saveLayoutDef } = this.props
  //   const index = layoutDef.layout.findIndex(l => l.i === i)
  //   const newLayoutDef = { ...layoutDef }

  //   if (index >= 0) {
  //     newLayoutDef.layout.splice(index, 1)
  //   }

  //   saveLayoutDef(newLayoutDef)
  // }

  // onCreateNewLayout(layoutName) {
  //   const { createLayout, tradingEnabled } = this.props

  //   createLayout(layoutName, tradingEnabled)

  //   setTimeout(() => {
  //     const { layouts, saveLayoutDef } = this.props

  //     this.setState(() => ({
  //       addLayoutModalOpen: false,
  //       layoutID: layoutName,
  //     }))

  //     saveLayoutDef(layouts[layoutName])
  //   }, 500)
  // }

  // onToggleCreateNewLayoutModal() {
  //   this.setState(({ addLayoutModalOpen }) => ({
  //     addLayoutModalOpen: !addLayoutModalOpen,
  //   }))
  // }

  // onToggleAddComponentModal() {
  //   this.setState(({ addComponentModalOpen }) => ({
  //     addComponentModalOpen: !addComponentModalOpen,
  //   }))
  // }

  // onChangeLayout(id) {
  //   const { layouts, saveLayoutDef } = this.props

  //   this.setState(() => ({
  //     layoutID: id,
  //   }))
  //   saveLayoutDef(layouts[id])
  // }

  // onDeleteLayout() {
  //   const { layoutID } = this.state
  //   const {
  //     deleteLayout, layouts, defaultLayoutID, saveLayoutDef,
  //   } = this.props
  //   deleteLayout(layoutID)

  //   this.setState(() => ({
  //     layoutID: defaultLayoutID,
  //   }))
  //   saveLayoutDef(layouts[defaultLayoutID])
  // }

  const tradingEnabled = false

  const layoutNames = _filter(_keys(layouts), id => (
    (layouts[id].type === 'trading' && tradingEnabled) || (layouts[id].type === 'data' && !tradingEnabled)
  ))

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
