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
import TabTitle from './TabTitle'
import './style.css'

const TradingStatePanel = ({
  dark, onRemove, moveable, removeable, getPositionsCount, algoOrdersCount, atomicOrdersCount, markets,
  setFilteredValueWithKey, atomicOrders, algoOrders, balances,
}) => {
  const [activeFilter, setActiveFilter] = useState({})
  const positionsCount = getPositionsCount(activeFilter)

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

  const getFilteredBalances = () => {
    let filteredBalances = balances

    if (!_isEmpty(activeFilter)) {
      const { base, quote } = activeFilter
      filteredBalances = _filter(balances, ({ currency }) => currency === base || currency === quote)
    }

    setFilteredValueWithKey('filteredBalances', filteredBalances)
  }

  useEffect(getFilteredBalances, [activeFilter, balances])
  useEffect(getFilteredAtomicOrders, [activeFilter, atomicOrders])
  useEffect(getFilteredAlgoOrders, [activeFilter, algoOrders])

  return (
    <Panel
      label='Trading Stage'
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
          tabtitle={<TabTitle heading='Positions' count={positionsCount} />}
          activeFilter={activeFilter}
        />
        <AtomicOrdersTable
          htmlKey='Atomics'
          tabtitle={<TabTitle heading='Atomics' count={atomicOrdersCount} />}
        />
        <AlgoOrdersTable
          htmlKey='Algos'
          tabtitle={<TabTitle heading='Algos' count={algoOrdersCount} />}
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
  getPositionsCount: PropTypes.func,
  algoOrdersCount: PropTypes.number,
  atomicOrdersCount: PropTypes.number,
  setFilteredValueWithKey: PropTypes.func.isRequired,
  balances: PropTypes.arrayOf(PropTypes.object).isRequired,
  algoOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
  atomicOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
  markets: PropTypes.arrayOf(PropTypes.object).isRequired,
}

TradingStatePanel.defaultProps = {
  dark: true,
  moveable: false,
  removeable: false,
  getPositionsCount: () => { },
  onRemove: () => { },
  algoOrdersCount: 0,
  atomicOrdersCount: 0,
}

export default memo(TradingStatePanel)
