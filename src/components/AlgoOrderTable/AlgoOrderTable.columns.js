import React from 'react'
import { Icon } from '@blueprintjs/core'
import Switch from 'react-switch'


export default [{
  width: 300,
  label: 'Name',
  dataKey: 'name',
  cellRenderer: ({ rowData = {} }) => rowData.name
}, {
  width: 300,
  label: 'Created',
  dataKey: 'mts',
  cellRenderer: ({ rowData = {} }) => {
    if (typeof rowData.mts === 'string') {
      return rowData.mts
    }
    return new Date(rowData.mts).toLocaleString()
  },
}, {
  width: 300,
  label: 'Status',
  dataKey: 'status',
  cellRenderer: ({ rowData = {} }) => rowData.status 
},
// {
//   width: 120,
//   label: 'Actions',
//   dataKey: 'gid',
//   cellRenderer: ({ rowData = {} }) => (
//     rowData.status === 'ACTIVE'
//       ? <Switch checked={true} height={14} width={28} onColor='#0F0' />
//       : <Switch checked={false} height={14} width={28} offColor='#C1C2C3' />
//   ),
// }
]
