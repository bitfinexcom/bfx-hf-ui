import React from 'react'
import { Icon } from 'react-fa'
import _keys from 'lodash/keys'
import humanizeDuration from 'humanize-duration'
import TIME_FRAME_LABELS from '../../util/time_frames'

const { bitfinex: TFS } = TIME_FRAME_LABELS

export default ({ showDuration } = {}) => [{
  label: 'Symbol',
  dataKey: 'symbol',
  width: 120,
  cellRenderer: ({ rowData = {} }) => ([
    rowData.symbol.substring(1, 4),
    rowData.symbol.substring(4),
  ].join('/')),
}, {
  label: 'TF',
  dataKey: 'tf',
  width: 120,
  cellRenderer: ({ rowData = {} }) => (
    _keys(TFS).find(k => TFS[k] === rowData.tf) || '-'
  ),
}, {
  label: 'Started',
  dataKey: 'startedMTS',
  width: 240,
  cellRenderer: ({ rowData = {} }) => (
    new Date(rowData.startedMTS).toLocaleString()
  ),
}, (showDuration ? {
  label: 'Duration',
  dataKey: 'duration',
  width: 240,
  cellRenderer: ({ rowData = {} }) => (
    humanizeDuration(Date.now() - rowData.startedMTS)
  ),
} : {
  label: 'Ended',
  dataKey: 'endedMTS',
  width: 240,
  cellRenderer: ({ rowData = {} }) => (
    new Date(rowData.endedMTS).toLocaleString()
  ),
}), {
  label: '',
  dataKey: 'actions',
  width: 200,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    rowData.active ? (
      <div className='hfui-strategyexectable__action'>
        <Icon name='stop' />
      </div>
    ) : <div />
  ),
}]
