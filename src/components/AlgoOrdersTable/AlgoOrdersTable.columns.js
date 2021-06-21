import React from 'react'

export default (authToken, cancelOrder, gaCancelOrder) => [{
  label: 'Name',
  dataKey: 'name',
  width: 90,
  flexGrow: 0.7,
  cellRenderer: ({ rowData = {} }) => rowData.name,
}, {
  label: 'Context',
  dataKey: 'args._margin',
  width: 65,
  flexGrow: 0.65,
  cellRenderer: ({ rowData = {} }) => {
    return rowData.args?._margin ? 'Margin' : 'Exchange'
  },
}, {
  label: 'Created',
  dataKey: 'gid',
  width: 155,
  flexGrow: 1.55,
  cellRenderer: ({ rowData = {} }) => new Date(+rowData.gid).toLocaleString(),
}, {
  label: 'Symbol',
  dataKey: 'args.symbol',
  width: 140,
  flexGrow: 1.4,
  cellRenderer: ({ rowData = {} }) => rowData.args?.symbol,
}, {
  label: 'Label',
  dataKey: 'label',
  width: 545,
  flexGrow: 5.4,
  cellRenderer: ({ rowData = {} }) => rowData.label,
}, {
  label: 'Actions',
  dataKey: 'cid',
  width: 40,
  flexGrow: 0.4,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <div className='icons-cell'>
      <i
        role='button'
        tabIndex={0}
        className='icon-cancel'
        onClick={() => {
          cancelOrder(authToken, rowData)
          gaCancelOrder()
        }}
      />
    </div>
  ),
  disableSort: true,
}]
