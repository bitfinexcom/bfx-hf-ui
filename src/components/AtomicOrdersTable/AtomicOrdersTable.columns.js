import React from 'react'

export default (exID, authToken, cancelOrder, gaCancelOrder) => [{
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
    ? <span className='hfui-red'>{rowData.amount}</span>
    : <span className='hfui-green'>{rowData.amount}</span>
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
        className='icon-cancel'
        onClick={() => {
          cancelOrder(exID, authToken, rowData)
          gaCancelOrder()
        }}
      />
    </div>
  ),
}]
