import React from 'react'
import Switch from 'react-switch'
import { Icon } from '@blueprintjs/core'
import { store } from '../../StoreWrapper'

// const openEditor = () => {
//   store.dispatch({ type: 'TOGGLE_EDITOR', payload: { editorOpened: true } })
// }
export default [{
  width: 300,
  label: 'Name',
  dataKey: 'name',
  cellRenderer: ({ rowData = {} }) => rowData.name,
},
{
  width: 300,
  label: 'Created',
  dataKey: 'mts',
  cellRenderer: ({ rowData = {} }) => {
    const timestamp = +rowData.mts / 1000
    return new Date(timestamp).toLocaleString()
  },
},
{
  width: 300,
  label: 'Type',
  dataKey: 'type',
  cellRenderer: ({ rowData = {} }) => rowData.orderType,
}, {
  width: 300,
  label: 'Amount',
  dataKey: 'amount',
  cellRenderer: ({ rowData = {} }) => rowData.amount,
},
{
  width: 300,
  label: 'Symbol',
  dataKey: 'symbol',
  cellRenderer: ({ rowData = {} }) => rowData.symbol,
}, {
  width: 300,
  label: 'Status',
  dataKey: 'status',
  cellRenderer: ({ rowData = {} }) => rowData.status,
}]
