import _capitalize from 'lodash/capitalize'
import { prepareAmount } from 'bfx-api-node-util'

export default () => [{
  label: 'Context',
  dataKey: 'context',
  width: 120,
  cellRenderer: ({ rowData = {} }) => _capitalize(rowData.context),
}, {
  label: 'Currency',
  dataKey: 'currency',
  width: 100,
  cellRenderer: ({ rowData = {} }) => rowData.currency,
}, {
  label: 'Balance',
  dataKey: 'balance',
  width: 120,
  cellRenderer: ({ rowData = {} }) => prepareAmount(rowData.balance),
}, {
  label: 'Available',
  dataKey: 'available',
  width: 120,
  cellRenderer: ({ rowData = {} }) => prepareAmount(rowData.available),
}]
