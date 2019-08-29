import React from 'react'
import _capitalize from 'lodash/capitalize'

export default (exID, cancelOrder) => [{
  width: 120,
  label: 'Name',
  dataKey: 'name',
  cellRenderer: ({ rowData = {} }) => rowData.name,
}, {
  width: 120,
  label: 'Exchange',
  dataKey: 'exID',
  cellRenderer: ({ rowData = {} }) => _capitalize(rowData.exID),
}, {
  width: 140,
  label: 'Created',
  dataKey: 'mts',
  cellRenderer: ({ rowData = {} }) => (
    new Date(+rowData.gid).toLocaleString()
  ),
}, {
  width: 80,
  label: 'Symbol',
  dataKey: 'symbol',
  cellRenderer: ({ rowData = {} }) => rowData.args.symbol,
}, {
  width: 80,
  label: 'Context',
  dataKey: 'gid',
  cellRenderer: ({ rowData = {} }) => (rowData.args._margin
    ? 'Margin'
    : 'Exchange'),
}, {
  width: 300,
  label: 'Label',
  dataKey: 'label',
  cellRenderer: ({ rowData = {} }) => rowData.label,
}, {
  label: 'Actions',
  dataKey: 'gid',
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
