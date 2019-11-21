import React from 'react'

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
    ? <span className='hfui-red'>{rowData.amount}</span>
    : <span className='hfui-green'>{rowData.amount}</span>
  ),
}, {
  label: 'Type',
  dataKey: 'type',
  width: 100,
  cellRenderer: ({ rowData = {} }) => rowData.type,
}]
