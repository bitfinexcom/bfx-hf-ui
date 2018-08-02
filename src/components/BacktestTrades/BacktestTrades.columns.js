import React from 'react'
import prepareAmount from '../../util/precision/prepare_amount'
import preparePrice from '../../util/precision/prepare_price'
import FormatPL from '../../ui/Format/PL'
import FormatAmount from '../../ui/Format/Amount'

export default [{
  width: 200,
  label: 'Created',
  dataKey: 'mts',
  cellRenderer: ({ rowData = {} }) => (
    new Date(rowData.mts).toLocaleString()
  )
}, {
  width: 80,
  label: 'Symbol',
  dataKey: 'symbol',
  cellRenderer: ({ rowData = {} }) => rowData.symbol,
}, {
  width: 100,
  label: 'Amount',
  dataKey: 'amount',
  className: 'table__cell-alignright',
  headerClassName: 'table__cell-alignright',
  cellRenderer: ({ rowData = {} }) => <FormatAmount v={rowData.amount} />
}, {
  width: 100,
  label: 'Price',
  dataKey: 'price',
  cellRenderer: ({ rowData = {} }) => preparePrice(rowData.price),
}, {
  width: 100,
  label: 'Fee',
  dataKey: 'fee',
  cellRenderer: ({ rowData = {} }) => prepareAmount(-1 * rowData.fee),
}, {
  width: 100,
  label: 'P/L',
  dataKey: 'pl',
  className: 'table__cell-alignright',
  headerClassName: 'table__cell-alignright',
  cellRenderer: ({ rowData = {} }) => <FormatPL v={rowData.pl} />
}, {
  width: 200,
  flexGrow: 1,
  label: 'Label',
  dataKey: 'label',
  cellRenderer: ({ rowData = {} }) => rowData.label || '',
}]
