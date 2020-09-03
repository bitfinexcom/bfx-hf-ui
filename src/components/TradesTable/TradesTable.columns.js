import React from 'react'
import BigN from 'bignumber.js'
import { prepareAmount } from 'bfx-api-node-util'
import PLNumber from '../../ui/PLNumber'

import i18n from './i18n.json'

console.log(i18n)
const dictionary = i18n['ru-RU']

export default [{
  label: dictionary.time,
  dataKey: 'mts',
  width: 100,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <PLNumber
      value={rowData.amount}
      prepareFunc={() => new Date(rowData.mts).toLocaleTimeString()}
    />
  ),
}, {
  label: dictionary.price,
  dataKey: 'price',
  width: 120,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <PLNumber
      value={rowData.amount}
      prepareFunc={() => new BigN(rowData.price).toString(10)}
    />
  ),
}, {
  label: dictionary.amount,
  dataKey: 'amount',
  width: 120,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <PLNumber
      value={rowData.amount}
      prepareFunc={prepareAmount}
    />
  ),
}]
