import React from 'react'
import BigN from 'bignumber.js'
import { prepareAmount } from 'bfx-api-node-util'
import PLNumber from '../../ui/PLNumber'

export default [{
  label: 'Time',
  dataKey: 'mts',
  width: 100,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <PLNumber
      value={rowData.amount}
      prepareFunc={() => new Date(rowData.mts).toLocaleTimeString()}
    />
  ),
}, {
  label: 'Price',
  dataKey: 'price',
  width: 120,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <PLNumber
      value={rowData.amount}
      prepareFunc={() => new BigN(rowData.price).toString(10)}
    />
  ),
}, {
  label: 'Amount',
  dataKey: 'amount',
  width: 120,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <PLNumber
      value={rowData.amount}
      prepareFunc={prepareAmount}
    />
  ),
}]
