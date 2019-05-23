import React from 'react'
import { Icon } from '@blueprintjs/core'

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
  cellRenderer: ({ rowData = {} }) => [
    <Icon icon='play' key={'play'} />,
    <Icon icon='pause' key={'pause'} />
  ],
}]
