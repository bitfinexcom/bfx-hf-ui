import React, { useState, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import _filter from 'lodash/filter'

import Panel from '../../ui/Panel'
import PositionsTable from '../PositionsTable'
import AtomicOrdersTable from '../AtomicOrdersTable'
import AlgoOrdersTable from '../AlgoOrdersTable'
import BalancesTable from '../BalancesTable'
import MarketSelect from '../MarketSelect'
import './style.css'

const renderCounter = (num) => {
  if (num <= 0) {
    return ''
  }

  return <span className='hfui-tspanel-counter'>{num}</span>
}

const TradingStatePanel = ({
  dark, onRemove, moveable, removeable, positionsCount, algoOrdersCount, atomicOrdersCount, markets,
  setFilteredValueWithKey, atomicOrders, algoOrders, positions, balances,
}) => {
  const [activeFilter, setActiveFilter] = useState({})

  const getFilteredAtomicOrders = () => {
    const filteredAtomicOrders = _isEmpty(activeFilter)
      ? atomicOrders
      : _filter(atomicOrders, o => o.symbol === activeFilter.wsID)

    setFilteredValueWithKey('filteredAtomicOrders', filteredAtomicOrders)
  }

  const getFilteredAlgoOrders = () => {
    const filteredAO = _isEmpty(activeFilter)
      ? algoOrders
      : _filter(algoOrders, ao => ao.args.symbol === activeFilter.wsID)

    setFilteredValueWithKey('filteredAO', filteredAO)
  }

  const getFilteredPositions = () => {
    const filteredPositions = _isEmpty(activeFilter)
      ? positions
      : _filter(positions, p => p.symbol === activeFilter.wsID)

    setFilteredValueWithKey('filteredPositions', filteredPositions)
  }

  const getFilteredBalances = () => {
    let filteredBalances = balances

    if (!_isEmpty(activeFilter)) {
      const { base, quote } = activeFilter
      filteredBalances = _filter(balances, ({ currency }) => currency === base || currency === quote)
    }

    setFilteredValueWithKey('filteredBalances', filteredBalances)
  }

  useEffect(getFilteredPositions, [activeFilter, positions])
  useEffect(getFilteredBalances, [activeFilter, balances])
  useEffect(getFilteredAtomicOrders, [activeFilter, atomicOrders])
  useEffect(getFilteredAlgoOrders, [activeFilter, algoOrders])

  return (
    <Panel
      label='TRADING STAGE'
      dark={dark}
      darkHeader={dark}
      className='hfui-tradingstatepanel__wrapper'
      moveable={false}
      removeable={false}
      extraIcons={[_isEmpty(activeFilter) ? (
        <MarketSelect
          key='filter-market'
          markets={markets}
          value={{}}
          onChange={setActiveFilter}
          renderWithFavorites
        />
      ) : (
        <div key='filter-market' onClick={() => setActiveFilter({})} className='hfui-tspanel-header-button active'>
          <i className='icon-filter-active' />
          <p>{activeFilter.uiID}</p>
        </div>
      ), (
        <div key='filter-by'>
          <p className='hfui-uppercase'>
            {_isEmpty(activeFilter) ? 'Filter' : 'Filtering'}
            &nbsp;by:
          </p>
        </div>
      )]}
    >
      <Panel
        onRemove={onRemove}
        moveable={moveable}
        removeable={removeable}
        darkHeader
      >
        <PositionsTable
          renderedInTradingState
          htmlKey='Positions'
          tabtitle={(
            <span>
              Positions
              {renderCounter(positionsCount)}
            </span>
          )}
        />
        <AtomicOrdersTable
          htmlKey='Atomics'
          tabtitle={(
            <span>
              Atomics
              {renderCounter(atomicOrdersCount)}
            </span>
          )}
        />
        <AlgoOrdersTable
          htmlKey='Algos'
          tabtitle={(
            <span>
              Algos
              {renderCounter(algoOrdersCount)}
            </span>
          )}
        />
        <BalancesTable
          renderedInTradingState
          htmlKey='Balances'
          tabtitle='Balances'
          hideZeroBalances
        />
      </Panel>
    </Panel>
  )
}

TradingStatePanel.propTypes = {
  dark: PropTypes.bool,
  moveable: PropTypes.bool,
  onRemove: PropTypes.func,
  removeable: PropTypes.bool,
  positionsCount: PropTypes.number,
  algoOrdersCount: PropTypes.number,
  atomicOrdersCount: PropTypes.number,
  setFilteredValueWithKey: PropTypes.func.isRequired,
  balances: PropTypes.arrayOf(PropTypes.object).isRequired,
  positions: PropTypes.arrayOf(PropTypes.object).isRequired,
  algoOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
  atomicOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
  markets: PropTypes.arrayOf(PropTypes.object).isRequired,
}

TradingStatePanel.defaultProps = {
  dark: true,
  moveable: false,
  removeable: false,
  positionsCount: 0,
  onRemove: () => { },
  algoOrdersCount: 0,
  atomicOrdersCount: 0,
}

export default memo(TradingStatePanel)
