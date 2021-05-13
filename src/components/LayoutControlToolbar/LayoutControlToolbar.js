/* eslint-disable */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import _keys from 'lodash/keys'
import _filter from 'lodash/filter'

import Button from '../../ui/Button'
import Dropdown from '../../ui/Dropdown'
import './style.css'

const LayoutControlToolbar = ({
  layouts, tradingEnabled, onAddLayout, onDeleteLayout, onSaveLayout,
  onAddComponent, activeLayout, layoutDirty, onChangeLayout, activeLayoutID,
}) => {
  const layoutNames = _filter(_keys(layouts), id => (
    (layouts[id].type === 'trading' && tradingEnabled) || (layouts[id].type === 'data' && !tradingEnabled)
  ))

  const { canDelete } = activeLayout || {}
  const defaultLayoutID = 'Default Market Data'

  return (
    <div className='hfui-layoutcontroltoolbar__wrapper'>
      <Dropdown
        placeholder={defaultLayoutID}
        value={activeLayoutID}
        onChange={onChangeLayout}
        options={layoutNames.map(name => ({
          label: name,
          value: name,
        }))}
      />

      <Button
        onClick={onAddLayout}
        label={[
          <i key='icon' className='icon-plus' />,
          <p key='text'>Add Layout</p>,
        ]}
      />

      <Button
        green
        onClick={onAddComponent}
        label={[
          <i key='icon' className='icon-plus' />,
          <p key='text'>Add Component</p>,
        ]}
      />

      <Button
        green={layoutDirty}
        disabled={!layoutDirty}
        onClick={onSaveLayout}
        className='hfui-save-layout__btn'
        label={[
          <i key='icon' className='icon-save' />,
          <p key='text'>Save</p>,
        ]}
      />

      <Button
        onClick={onDeleteLayout}
        disabled={!canDelete}
        className='hfui-remove-layout__btn'
        label={[
          <i key='icon' className='icon-clear' />,
          <p key='text'>Delete</p>,
        ]}
      />
    </div>
  )
}

LayoutControlToolbar.propTypes = {
  layouts: PropTypes.object,
  tradingEnabled: PropTypes.bool,
  layoutDirty: PropTypes.bool,
  activeLayout: PropTypes.object.isRequired,
  onAddLayout: PropTypes.func.isRequired,
  onDeleteLayout: PropTypes.func.isRequired,
  onSaveLayout: PropTypes.func.isRequired,
  onAddComponent: PropTypes.func.isRequired,
  onChangeLayout: PropTypes.func.isRequired,
}

LayoutControlToolbar.defaultProps = {
  layouts: {},
  tradingEnabled: false,
  layoutDirty: false,
}

export default memo(LayoutControlToolbar)