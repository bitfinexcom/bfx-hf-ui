import React from 'react'
import PropTypes from 'prop-types'
import { Table, Column, Cell } from '@blueprintjs/table'

import Panel from '../../ui/Panel'

export default class BacktestTrades extends React.PureComponent {
  static propTypes = {
    trades: PropTypes.array
  }

  static defaultProps = {
    trades: []
  }

  render () {
    const { trades } = this.props

    return (
      <Panel label='Backtest Trades'>
        <Table numRows={trades.length}>
          <Column
            name='Created'
            cellRenderer={i => <Cell>{new Date(trades[i].trade.mts).toLocaleString()}</Cell>}
          />

          <Column
            name='Symbol'
            cellRenderer={i => <Cell>{trades[i].trade.symbol}</Cell>}
          />

          <Column
            name='Price'
            cellRenderer={i => <Cell>{trades[i].trade.price}</Cell>}
          />

          <Column
            name='Amount'
            cellRenderer={i => <Cell>{trades[i].trade.amount}</Cell>}
          />

          <Column
            name='Fee'
            cellRenderer={i => <Cell>{trades[i].trade.fee}</Cell>}
          />

          <Column
            name='Order Type'
            cellRenderer={i => <Cell>{(trades[i].order || {}).type || '-'}</Cell>}
          />

          <Column
            name='Order Status'
            cellRenderer={i => <Cell>{(trades[i].order || {}).status || '-'}</Cell>}
          />
        </Table>
      </Panel>
    )
  }
}
