import React from 'react'
import { preparePrice, prepareAmount } from 'bfx-api-node-util'
import { processBalance } from '../../util/ui'

export default [{
  label: 'Price',
  dataKey: 'price',
  width: 60,
  cellRenderer: ({ rowData = {} }) => preparePrice(rowData.price),
}, {
  label: 'Amount',
  dataKey: 'amount',
  width: 120,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <span className={rowData.amount < 0 ? 'hfui-red' : 'hfui-green'}>
      {processBalance(prepareAmount(rowData.amount))}
    </span>
  ),
}, {
  label: 'P/L',
  dataKey: 'pl',
  width: 120,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <span className={rowData.pl < 0 ? 'hfui-red' : 'hfui-green'}>
      {processBalance(prepareAmount(rowData.pl))}
    </span>
  ),
}, {
  label: 'Label',
  dataKey: 'label',
  width: 200,
  cellRenderer: ({ rowData = {} }) => rowData.label,
}, {
  label: 'Time',
  dataKey: 'mts',
  width: 150,
  cellRenderer: ({ rowData = {} }) => new Date(rowData.mts).toLocaleString(),
}]
