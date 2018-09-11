import React from 'react'
import _sum from 'lodash/sum'
import FormatPL from '../../ui/Format/PL'

export default [{
  width: 50,
  label: '#',
  dataKey: 'id'
}, {
  width: 200,
  label: 'ID',
  dataKey: 'bt_id'
}, {
  width: 70,
  label: 'Trades',
  dataKey: 'length',
  cellRenderer: ({ rowData = {} }) => rowData.trades.length
}, {
  width: 70,
  label: 'P/L',
  dataKey: 'pl',
  className: 'table__cell-alignright',
  headerClassName: 'table__cell-alignright',
  cellRenderer: ({ rowData = {} }) => (
    <FormatPL v={_sum(rowData.trades.map(t => t.pl))} />
  )
}]
