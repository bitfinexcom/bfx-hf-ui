/* eslint-disable react/prop-types */
import React from 'react'
import Switch from 'react-switch'
import { Icon } from '@blueprintjs/core'
import { store } from '../../StoreWrapper'
import WSHFActions from '../../redux/actions/ws-hf-server'


export default [{
  width: 300,
  label: 'Name',
  dataKey: 'name',
  cellRenderer: ({ rowData = {} }) => rowData.name,
}, {
  width: 300,
  label: 'Created',
  dataKey: 'mts',
  cellRenderer: ({ rowData = {} }) => {
    if (typeof rowData.mts === 'string') {
      return rowData.mts
    }
    return new Date(rowData.mts).toLocaleString()
  },
}, {
  width: 300,
  label: 'Actions',
  dataKey: 'gid',
  cellRenderer: ({ rowData = {}, rowIndex }) => (
    <Switch
      onChange={() => {
        store.dispatch({ type: 'CHANGE_STATUS', index: rowIndex })
        WSHFActions.send(['as', ['update.ao', rowData.name]])
      }}
      checked={rowData.status === 'ACTIVE'}
      height={14}
      width={28}
      onColor='#9dc24a'
      offColor='#2c3940'
    />
  ),
}]
