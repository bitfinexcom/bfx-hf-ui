import React from 'react'
import Switch from 'react-switch'
import { Icon } from '@blueprintjs/core'
import { store } from '../../StoreWrapper'

const openEditor = () => {
  store.dispatch({ type: 'TOGGLE_EDITOR', payload: { editorOpened: true } })
}
export default [{
  width: 300,
  label: 'Name',
  dataKey: 'name',
  cellRenderer: ({ rowData = {} }) => rowData.name,
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
  label: 'Actions',
  dataKey: 'gid',
  cellRenderer: ({ rowData = {}, rowIndex }) => {
    return <Switch
    onChange={() =>{ 
      store.dispatch({ type: 'CHANGE_STATUS', index: rowIndex })
      store.dispatch({type:'WS_HF_SEND', payload:['as', ['update.ao', rowData.name]] })
    }}
    checked={rowData.status === 'ACTIVE'}
    height={14}
    width={28}
    onColor='#0F0'
    offColor='#C1C2C3'
    />
  
  }
}]
