import React from 'react'
import PropTypes from 'prop-types'
import { Table, Column, Cell } from '@blueprintjs/table'

import Panel from '../../ui/Panel'

export default class BacktestTrades extends React.PureComponent {
  static propTypes = {
    onSelectTrade: PropTypes.func,
    trades: PropTypes.array
  }

  static defaultProps = {
    onSelectTrade: () => {},
    trades: []
  }

  constructor (props) {
    super(props)

    this.onSelectionChange = this.onSelectionChange.bind(this)
  }

  onSelectionChange (selection) {
    const { trades, onSelectTrade } = this.props
    onSelectTrade(trades[selection[0].rows[0]])
  }

  render () {
    const { trades } = this.props

    return (
      <Panel label='Backtest Trades'>
        <Table
          numRows={trades.length}
          enableMultipleSelection={false}
          onSelection={this.onSelectionChange}
        >
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
