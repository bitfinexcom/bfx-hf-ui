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
  cellRenderer: ({ rowData = {} }) => rowData.status,
}]
