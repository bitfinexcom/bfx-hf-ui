import React from 'react'

export default (authToken, cancelOrder, gaCancelOrder) => [{
  label: 'Name',
  dataKey: 'name',
  width: 90,
  cellRenderer: ({ rowData = {} }) => rowData.name,
}, {
  label: 'Context',
  dataKey: '_margin',
  width: 65,
  cellDataGetter: ({ rowData = {} }) => {
    return rowData.args?._margin ? 'Margin' : 'Exchange'
  },
  cellRenderer: ({ rowData = {} }) => {
    return rowData.args?._margin ? 'Margin' : 'Exchange'
  },
}, {
  label: 'Created',
  dataKey: 'gid',
  width: 140,
  cellRenderer: ({ rowData = {} }) => new Date(+rowData.gid).toLocaleString(),
}, {
  label: 'Symbol',
  dataKey: 'symbol',
  width: 145,
  cellDataGetter: ({ rowData = {} }) => rowData.args?.symbol,
  cellRenderer: ({ rowData = {} }) => rowData.args?.symbol,
}, {
  label: 'Label',
  dataKey: 'label',
  width: 550,
  cellRenderer: ({ rowData = {} }) => rowData.label,
}, {
  label: 'Actions',
  dataKey: 'cid',
  width: 40,
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
