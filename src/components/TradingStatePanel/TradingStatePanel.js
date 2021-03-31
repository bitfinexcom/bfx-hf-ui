import React from 'react'
import ClassNames from 'classnames'
import _flatten from 'lodash/flatten'

import Panel from '../../ui/Panel'
import PositionsTable from '../PositionsTable'
import AtomicOrdersTable from '../AtomicOrdersTable'
import AlgoOrdersTable from '../AlgoOrdersTable'
import BalancesTable from '../BalancesTable'
import { propTypes, defaultProps } from './TradingStatePanel.props'
import './style.css'

const renderCounter = (num) => {
  if (num <= 0) {
    return ''
  }

  return <span className='hfui-tspanel-counter'>{num}</span>
}

export default class TradingStatePanel extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    const { savedState = {} } = props
    const {
      exchangeFilterActive = false,
      marketFilterActive = false,
    } = savedState

    this.state = {
      exchangeFilterActive,
      marketFilterActive,
    }

    this.onToggleMarketFilter = this.onToggleMarketFilter.bind(this)
    this.onToggleExchangeFilter = this.onToggleExchangeFilter.bind(this)
  }

  componentDidMount() {
    this.loadData()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (JSON.stringify(nextProps) !== JSON.stringify(this.props) || JSON.stringify(nextState) !== JSON.stringify(this.state))
  }

  componentDidUpdate() {}
  getSnapshotBeforeUpdate() {
    return this.loadData()
  }

  onToggleMarketFilter() {
    this.setState(({ marketFilterActive }) => ({
      marketFilterActive: !marketFilterActive,
    }))
  }

  onToggleExchangeFilter() {
    this.setState(({ exchangeFilterActive }) => ({
      exchangeFilterActive: !exchangeFilterActive,
    }))
  }

  getFilteredAtomicOrders() {
    const {
      activeExchange, activeMarket, atomicOrders, setFilteredValueWithKey,
    } = this.props
    const { exchangeFilterActive, marketFilterActive } = this.state

    const filteredByExchange = exchangeFilterActive
      ? Object.values(atomicOrders[activeExchange] || {})
      : _flatten(Object.values(atomicOrders).map(Object.values))
    const filteredAtomicOrders = marketFilterActive
      ? filteredByExchange.filter(o => o.symbol === activeMarket.wsID)
      : filteredByExchange
    setFilteredValueWithKey('filteredAtomicOrders', filteredAtomicOrders)
    return filteredAtomicOrders
  }

  getFilteredAlgoOrders() {
    const {
      activeExchange, activeMarket, algoOrders, setFilteredValueWithKey,
    } = this.props
    const { exchangeFilterActive, marketFilterActive } = this.state

    const filteredByExchange = exchangeFilterActive
      ? Object.values(algoOrders[activeExchange] || {})
      : _flatten(Object.values(algoOrders).map(Object.values))
    const filteredAO = marketFilterActive
      ? filteredByExchange.filter(ao => ao.args.symbol === activeMarket.wsID)
      : filteredByExchange
    setFilteredValueWithKey('filteredAO', filteredAO)
    return filteredAO
  }

  getFilteredPositions() {
    const {
      activeExchange, activeMarket, positions, setFilteredValueWithKey,
    } = this.props
    const { exchangeFilterActive, marketFilterActive } = this.state

    const filteredByExchange = exchangeFilterActive
      ? Object.values(positions[activeExchange] || {})
      : _flatten(Object.values(positions).map(Object.values))
    const filteredPositions = marketFilterActive
      ? filteredByExchange.filter(p => p.symbol === activeMarket.wsID)
      : filteredByExchange
    setFilteredValueWithKey('filteredPositions', filteredPositions)
    return filteredPositions
  }

  getFilteredBalances() {
    const {
      activeExchange, balances, setFilteredValueWithKey, activeMarket,
    } = this.props
    const { base, quote } = activeMarket
    const { exchangeFilterActive, marketFilterActive } = this.state
    let filteredBalances = exchangeFilterActive
      ? Object.values(balances[activeExchange] || {})
      : _flatten(Object.values(balances).map(Object.values))
    filteredBalances = marketFilterActive ? filteredBalances.filter(({ currency }) => currency === base || currency === quote) : filteredBalances
    setFilteredValueWithKey('filteredBalances', filteredBalances)
    return filteredBalances
  }

  loadData() {
    this.getFilteredAtomicOrders()
    this.getFilteredAlgoOrders()
    this.getFilteredPositions()
    this.getFilteredBalances()

    return null
  }

  deferSaveState() {
    setTimeout(() => {
      this.saveState()
    }, 0)
  }

  saveState() {
    const { saveState, layoutID, layoutI } = this.props
    const { marketFilterActive, exchangeFilterActive } = this.state

    saveState(layoutID, layoutI, {
      exchangeFilterActive,
      marketFilterActive,
    })
  }

  render() {
    const {
      onRemove,
      moveable,
      removeable,
      activeMarket,
      activeExchange,
      positionsCount,
      algoOrdersCount,
      atomicOrdersCount,
    } = this.props
    const { marketFilterActive } = this.state

    return (
      <Panel
        label='TRADING STAGE'
        className='hfui-tradingstatepanel__wrapper'
        moveable={false}
        removeable={false}
        extraIcons={[(
          <div
            key='filter-market'
            onClick={this.onToggleMarketFilter}
            className={ClassNames('hfui-tspanel-header-button', {
              active: marketFilterActive,
            })}
          >
            <i className='icon-filter-active' />
            <p>{activeMarket.uiID}</p>
          </div>
        ), (
          <div key='filter-by'>
            <p className='hfui-uppercase'>Filter By:</p>
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
            htmlKey='Positions'
            tabtitle={(
              <span>
                Positions
                {renderCounter(positionsCount)}
              </span>
            )}
            exID={activeExchange}
          />
          <AtomicOrdersTable
            htmlKey='Atomics'
            tabtitle={(
              <span>
                Atomics
                {renderCounter(atomicOrdersCount)}
              </span>
            )}
            exID={activeExchange}
          />
          <AlgoOrdersTable
            htmlKey='Algos'
            tabtitle={(
              <span>
                Algos
                {renderCounter(algoOrdersCount)}
              </span>
            )}
            exID={activeExchange}
          />
          <BalancesTable
            htmlKey='Balances'
            tabtitle='Balances'
            exID={activeExchange}
            hideZeroBalances
          />
        </Panel>
      </Panel>
    )
  }
}
