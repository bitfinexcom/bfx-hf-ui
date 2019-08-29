import React from 'react'
import { preparePrice, prepareAmount } from 'bfx-api-node-util'

export default ({ exID, closePosition }) => [{
  label: 'Pair',
  dataKey: 'symbol',
  width: 120,
  cellRenderer: ({ rowData = {} }) => rowData.symbol,
}, {
  label: 'Amount',
  dataKey: 'amount',
  width: 120,
  cellRenderer: ({ rowData = {} }) => (rowData.amount < 0 // eslint-disable-line
    ? <span className='dtc-red'>{prepareAmount(rowData.amount)}</span>
    : <span className='dtc-green'>{prepareAmount(rowData.amount)}</span>
  ),
}, {
  label: 'Base Price',
  dataKey: 'basePrice',
  width: 100,
  cellRenderer: ({ rowData = {} }) => preparePrice(rowData.basePrice),
}, {
  label: 'Liq Price',
  dataKey: 'liquidationPrice',
  width: 100,
  cellRenderer: ({ rowData = {} }) => preparePrice(rowData.liquidationPrice),
}, {
  label: 'P/L',
  dataKey: 'pl',
  width: 100,
  cellRenderer: ({ rowData = {} }) => preparePrice(rowData.pl),
}, {
  label: 'P/L %',
  dataKey: 'plPerc',
  width: 100,
  cellRenderer: ({ rowData = {} }) => (rowData.plPerc || 0).toFixed(4),
}, {
  label: 'Funding Cost',
  dataKey: 'marginFunding',
  width: 100,
  cellRenderer: ({ rowData = {} }) => preparePrice(rowData.marginFunding),
}, {
  label: 'Actions',
  dataKey: 'cid',
  width: 100,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <div className='icons-cell'>
      <i
        role='button'
        tabIndex={0}
        className='far fa-times-circle'
        onClick={() => closePosition(exID, rowData)}
      />
    </div>
  ),
}]
