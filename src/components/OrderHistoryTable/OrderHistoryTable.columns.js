import React from 'react'
import { symbolToLabel, getFormatedStatus, getPriceFromStatus } from './OrderHistoryTable.helpers'

export default [{
  label: 'Price',
  dataKey: 'price',
  width: 120,
  cellRenderer: ({ rowData = {} }) => rowData.price,
}, {
  label: 'Amount',
  dataKey: 'amount',
  width: 120,
  cellRenderer: ({ rowData = {} }) => (rowData.amount < 0 // eslint-disable-line
    ? <span className='hfui-red'>{rowData.originalAmount}</span>
    : <span className='hfui-green'>{rowData.originalAmount}</span>
  ),
}, {
  label: 'Type',
  dataKey: 'type',
  width: 150,
  cellRenderer: ({ rowData = {} }) => rowData.type,
}, {
  label: 'Status',
  dataKey: 'status',
  width: 100,
  cellRenderer: ({ rowData = {} }) => getFormatedStatus(rowData.status),
}, {
  label: 'Average Execution Price',
  dataKey: 'avgExecPrice',
  width: 120,
  cellRenderer: ({ rowData = {} }) => getPriceFromStatus(rowData.status),
}, {
  label: 'Symbol',
  dataKey: 'symbol',
  width: 150,
  cellRenderer: ({ rowData = {} }) => symbolToLabel(rowData.symbol),
}]
