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
  label: 'CCY',
  dataKey: 'ccy',
  cellRenderer: ({ rowData = {} }) => rowData.ccy,
},

/* {
*  width: 80,
*  label: 'Symbol',
*  dataKey: 'symbol',
*  cellRenderer: ({ rowData = {} }) => rowData.symbol,
*}, {
*  width: 120,
*  label: 'Order Count',
*  dataKey: 'orderCount',
*  cellRenderer: ({ rowData = {} }) => rowData.orderCount,
*}, {
*  width: 120,
*  label: 'Status',
*  dataKey: 'status',
*  cellRenderer: ({ rowData = {} }) => rowData.status,
*},
*/
{
  width: 300,
  label: 'Status',
  dataKey: 'status',
  cellRenderer: ({ rowData = {} }) => rowData.status,
}]
