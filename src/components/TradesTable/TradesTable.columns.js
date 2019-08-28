import React from 'react'
import BigN from 'bignumber.js'
import { prepareAmount } from 'bfx-api-node-util'

export default [{
  label: 'Price',
  dataKey: 'price',
  width: 120,
  cellRenderer: ({ rowData = {} }) => new BigN(rowData.price).toString(10)
}, {
  label: 'Amount',
  dataKey: 'amount',
  width: 120,
  cellRenderer: ({ rowData = {} }) => (rowData.amount < 0
    ? <span className='dtc-red'>{prepareAmount(rowData.amount)}</span>
    : <span className='dtc-green'>{prepareAmount(rowData.amount)}</span>
  ),
}, {
  label: 'Time',
  dataKey: 'mts',
  width: 100,
  cellRenderer: ({ rowData = {} }) => new Date(rowData.mts).toLocaleTimeString()
}]
