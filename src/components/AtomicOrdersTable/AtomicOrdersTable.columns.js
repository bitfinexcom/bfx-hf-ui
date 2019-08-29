import React from 'react'

export default (exID, cancelOrder) => [{
  label: 'Symbol',
  dataKey: 'symbol',
  width: 120,
  cellRenderer: ({ rowData = {} }) => rowData.symbol,
}, {
  label: 'Type',
  dataKey: 'type',
  width: 120,
  cellRenderer: ({ rowData = {} }) => rowData.type,
}, {
  label: 'Amount',
  dataKey: 'amount',
  width: 120,
  cellRenderer: ({ rowData = {} }) => (rowData.amount < 0 // eslint-disable-line
    ? <span className='dtc-red'>{rowData.amount}</span>
    : <span className='dtc-green'>{rowData.amount}</span>
  ),
}, {
  label: 'Price',
  dataKey: 'price',
  width: 120,
  cellRenderer: ({ rowData = {} }) => rowData.price,
}, {
  label: 'Status',
  dataKey: 'status',
  width: 100,
  cellRenderer: ({ rowData = {} }) => rowData.status,
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
        onClick={() => cancelOrder(exID, rowData)}
      />
    </div>
  ),
}]
