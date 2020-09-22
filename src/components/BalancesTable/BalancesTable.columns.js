import _capitalize from 'lodash/capitalize'
import { prepareAmount } from 'bfx-api-node-util'

export default (dictionary) => [{
  label: dictionary.exchange,
  dataKey: 'exID',
  width: 120,
  cellRenderer: ({ rowData = {} }) => _capitalize(rowData.exID),
}, {
  label: dictionary.context,
  dataKey: 'context',
  width: 120,
  cellRenderer: ({ rowData = {} }) => _capitalize(rowData.context),
}, {
  label: dictionary.currency,
  dataKey: 'currency',
  width: 100,
  cellRenderer: ({ rowData = {} }) => rowData.currency,
}, {
  label: dictionary.balance,
  dataKey: 'balance',
  width: 120,
  cellRenderer: ({ rowData = {} }) => prepareAmount(rowData.balance),
}, {
  label: dictionary.available,
  dataKey: 'available',
  width: 120,
  cellRenderer: ({ rowData = {} }) => prepareAmount(rowData.available),
}]
