import React from 'react'
import Switch from 'react-switch'

let store = null

window.addEventListener('load', ()=> store = window._store )

export default [{
  width: 200,
  label: 'Name',
  dataKey: 'name',
  cellRenderer: ({ rowData = {} }) => rowData.name,
}, {
  width: 200,
  label: 'Created',
  dataKey: 'mts',
  cellRenderer: ({ rowData = {} }) => (
    new Date(rowData.mts).toLocaleString()
  ),
}, {
  width: 80,
  label: 'Symbol',
  dataKey: 'symbol',
  cellRenderer: ({ rowData = {} }) => rowData.symbol,
}, {
  width: 120,
  label: 'Order Count',
  dataKey: 'orderCount',
  cellRenderer: ({ rowData = {} }) => rowData.orderCount,
}, {
  width: 120,
  label: 'Status',
  dataKey: 'status',
  cellRenderer: ({ rowData = {} }) => rowData.status,
}, {
  width: 120,
  label: 'Actions',
  dataKey: 'gid',
  cellRenderer: ({ rowData = {}, rowIndex }) => {
    

    return <Switch
      onChange={() => store.dispatch({type: 'CHANGE_STATUS', index: rowIndex})}
      checked={rowData.status === 'ACTIVE'}
      height={14}
      width={28}
      onColor='#0F0'
      offColor='#C1C2C3'
    />
},
}]
