import React from 'react'

import Panel from '../../ui/Panel'
import Table from '../../ui/Table'
import AlgoOrderDefinitionsTableColumns from './AlgoOrderDefinitionsTable.columns'
import { propTypes, defaultProps } from './AlgoOrderDefinitionsTable.props'

const ALGO_NAMES = {
  'bfx-accumulate_distribute': 'Accumulate/Distribute',
  'bfx-ping_pong': 'Ping/Pong',
  'bfx-iceberg': 'Iceberg',
  'bfx-twap': 'TWAP',
}

export default class AlgoOrderTable extends React.Component {

  static propTypes = propTypes

  static defaultProps = defaultProps

  state = {
    editorOpened: false,
  }



  shouldComponentUpdate(nextProps) {
    const newAlgoOrders = nextProps.algoOrders
    const { algoOrders } = this.props
    if (newAlgoOrders.length !== algoOrders.length) {
      return true
    }

    const isSame = newAlgoOrders.every((row, indexRow) => row.every((value, indexValue) => value === algoOrders[indexRow][indexValue]))

    return !isSame
  }

  onRowClick({ index } = {}) {
    const {
      onSelect, algoOrders,
    } = this.props
    onSelect(algoOrders[index])
  }


  render () {
    const { orders } = this.props
    return (
      <Panel label='Orders' contentClassName='table__wrapper'>
        <Table
          data={orders}
          columns={AlgoOrderDefinitionsTableColumns}
          onRowClick={this.onRowClick}
          maxWidth={850}
          defaultSortDirection='ASC'
        />
      </Panel>
    )
  }
}
