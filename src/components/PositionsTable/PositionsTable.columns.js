import React from 'react'
import { preparePrice, prepareAmount } from 'bfx-api-node-util'
import { processBalance } from '../../util/ui'

export default ({ authToken, closePosition }) => [{
  label: 'Pair',
  dataKey: 'symbol',
  width: 145,
  cellRenderer: ({ rowData = {} }) => rowData.symbol,
}, {
  label: 'Amount',
  dataKey: 'amount',
  width: 120,
  cellRenderer: ({ rowData = {} }) => (rowData.amount < 0 // eslint-disable-line
    ? <span className='hfui-red'>{processBalance(prepareAmount(rowData.amount))}</span>
    : <span className='hfui-green'>{processBalance(prepareAmount(rowData.amount))}</span>
  ),
}, {
  label: 'Base Price',
  dataKey: 'basePrice',
  width: 100,
  cellRenderer: ({ rowData = {} }) => processBalance(preparePrice(rowData.basePrice)),
}, {
  label: 'Liq Price',
  dataKey: 'liquidationPrice',
  width: 100,
  cellRenderer: ({ rowData = {} }) => processBalance(preparePrice(rowData.liquidationPrice)),
}, {
  label: 'P/L',
  dataKey: 'pl',
  width: 100,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <span className={rowData.pl < 0 ? 'hfui-red' : 'hfui-green'}>
      {processBalance(preparePrice(rowData.pl))}
    </span>
  ),
}, {
  label: 'P/L %',
  dataKey: 'plPerc',
  width: 100,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <span className={rowData.plPerc && rowData.plPerc < 0 ? 'hfui-red' : 'hfui-green'}>
      {(rowData.plPerc || 0).toFixed(4)}
    </span>
  ),
}, {
  label: 'Funding Cost',
  dataKey: 'marginFunding',
  width: 100,
  cellRenderer: ({ rowData = {} }) => processBalance(preparePrice(rowData.marginFunding)),
}, {
  label: 'Actions',
  dataKey: 'id',
  width: 100,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <div className='icons-cell'>
      <i
        role='button'
        tabIndex={0}
        className='icon-cancel'
        onClick={() => closePosition(authToken, rowData)}
      />
    </div>
  ),
}]
