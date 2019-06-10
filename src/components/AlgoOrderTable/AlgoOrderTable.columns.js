import React from 'react'
import { Icon } from '@blueprintjs/core'
import Switch from 'react-switch'


export default [{
  width: 200,
  label: 'Name',
  dataKey: 'name',
  cellRenderer: ({ rowData = {} }) => rowData.name
}, {
  width: 200,
  label: 'Created',
  dataKey: 'mts',
  cellRenderer: ({ rowData = {} }) => (
    new Date(rowData.mts).toLocaleString()
  ),
}, {
  width: 80,
  label: 'Symbol',
  dataKey: 'symbol',
  cellRenderer: ({ rowData = {} }) => rowData.symbol
}, {
  width: 120,
  label: 'Order Count',
  dataKey: 'orderCount',
  cellRenderer: ({ rowData = {} }) => rowData.orderCount
}, {
  width: 120,
  label: 'Status',
  dataKey: 'status',
  cellRenderer: ({ rowData = {} }) => rowData.status 
}, {
  width: 120,
  label: 'Actions',
  dataKey: 'gid',
  cellRenderer: ({ rowData = {} }) => (
    rowData.status === 'ACTIVE'
      ? <Switch checked={true} height={14} width={28} onColor='#0F0' />
      : <Switch checked={false} height={14} width={28} offColor='#C1C2C3' />
  ),
}]
