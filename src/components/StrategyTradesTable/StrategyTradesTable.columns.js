import React from 'react'
import { preparePrice, prepareAmount } from 'bfx-api-node-util'

export default [{
  label: 'Price',
  dataKey: 'price',
  width: 60,
  cellRenderer: ({ rowData = {} }) => preparePrice(rowData.price),
}, {
  label: 'Amount',
  dataKey: 'amount',
  width: 120,
  cellRenderer: ({ rowData = {} }) => (rowData.amount < 0 // eslint-disable-line
    ? <span className='hfui-red'>{prepareAmount(rowData.amount)}</span>
    : <span className='hfui-green'>{prepareAmount(rowData.amount)}</span>
  ),
}, {
  label: 'P/L',
  dataKey: 'pl',
  width: 120,
  cellRenderer: ({ rowData = {} }) => (rowData.pl < 0 // eslint-disable-line
    ? <span className='hfui-red'>{prepareAmount(rowData.pl)}</span>
    : <span className='hfui-green'>{prepareAmount(rowData.pl)}</span>
  ),
}, {
  label: 'Label',
  dataKey: 'label',
  width: 200,
  cellRenderer: ({ rowData = {} }) => rowData.label,
}, {
  label: 'Time',
  dataKey: 'mts',
  width: 100,
  cellRenderer: ({ rowData = {} }) => new Date(rowData.mts).toLocaleTimeString(),
}]
