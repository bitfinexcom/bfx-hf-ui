import React, { memo } from 'react'
import _isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'

import StrategyTradesTableColumns from './StrategyTradesTable.columns'

import Panel from '../../ui/Panel'
import Table from '../../ui/Table'
import './style.css'

const StrategyTradesTable = ({
  label, trades, onTradeClick, dark,
}) => (
  <Panel
    dark={dark}
    darkHeader={dark}
    label={label}
    removeable={false}
    moveable={false}
    className='hfui-strategytradestable__wrapper'
  >
    {_isEmpty(trades)
      ? (
        <div className='no-trades__wrapper'>
          <span className='no-trades__notification'>
            There were no trades in this timeframe
          </span>
        </div>
      ) : (
        <Table
          data={trades}
          columns={StrategyTradesTableColumns}
          defaultSortBy='mts'
          defaultSortDirection='DESC'
          onRowClick={({ rowData }) => onTradeClick(rowData)}
        />
      )}
  </Panel>
)

StrategyTradesTable.propTypes = {
  trades: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTradeClick: PropTypes.func.isRequired,
  label: PropTypes.string,
  dark: PropTypes.bool,
}

StrategyTradesTable.defaultProps = {
  label: 'Strategy Trades',
  dark: true,
}

export default memo(StrategyTradesTable)
