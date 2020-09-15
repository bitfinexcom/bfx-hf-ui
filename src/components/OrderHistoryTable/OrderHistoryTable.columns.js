import React from 'react'

import i18n from './i18n.json'

const dictionary = i18n['ru-RU']

export default [{
  label: dictionary.price,
  dataKey: 'price',
  width: 120,
  cellRenderer: ({ rowData = {} }) => rowData.price,
}, {
  label: dictionary.amount,
  dataKey: 'amount',
  width: 120,
  cellRenderer: ({ rowData = {} }) => (rowData.amount < 0 // eslint-disable-line
    ? <span className='hfui-red'>{rowData.amount}</span>
    : <span className='hfui-green'>{rowData.amount}</span>
  ),
}, {
  label: dictionary.type,
  dataKey: 'type',
  width: 100,
  cellRenderer: ({ rowData = {} }) => rowData.type,
}]
